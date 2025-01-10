/* MODULE IMPORTS */
// High-level API for automation in Chrome & Firefox
import puppeteer from 'puppeteer'
// Enables interacting with the file system
import fs from 'node:fs'

// Get maxPages and scrapeDetails flag from command-line arguments or environment variables
const maxPages = process.argv[2] || process.env.MAX_PAGES || 10
const scrapeDetails = process.argv[3] === 'true' || process.env.SCRAPE_DETAILS === 'true'

/* SCRAPE FUNCTION */
const scrape = async ()=> {
  // Launch the browser
  const browser = await puppeteer.launch()
  // Array to store all the books
  const allBooks = []
  // Initializing the first page in 1
  let currentPage = 1

  try {
    // Open a new blank page
    const page = await browser.newPage()

    while(currentPage <= maxPages) {
      // Page to scrap
      const url = `https://books.toscrape.com/catalogue/page-${currentPage}.html`

      try {
        // Navigate the page to a URL.
        await page.goto(url)
        console.log(`Scraping page '${currentPage}'... `) // Logging the initialization in the console
        /* The 'evaluate' method evaluates a function in the 
          page's context and returns the result.
          If the function passed to page.evaluate returns a Promise, 
          the function will wait for the promise to resolve and return its value.
        */
        const books = await page.evaluate(()=> {
          const bookElements = document.querySelectorAll('.product_pod')
          return Array.from(bookElements).map((book)=> {
            const title = book.querySelector('h3 a').getAttribute('title')
            const price = book.querySelector('.price_color').textContent
            const stock = book.querySelector('.instock.availability') ? 'In stock' : 'Out of stock'
            const rating = book.querySelector('.star-rating').className.split(' ')[1]
            const link = book.querySelector('h3 a').getAttribute('href')

            return { title, price, stock, rating, link }
          })
        })

        // Navigate to each book's link to scrape additional details (If enabled)
        if (scrapeDetails) {
          for(const book of books) {
            try {
              const fullLink = new URL(book.link, url).toString()
              await page.goto(fullLink)

              const additionalDetails = await page.evaluate(() => {
                const description = document.querySelector('#product_description ~ p')?.textContent || 'No description available';
                const genre = document.querySelector('.breadcrumb li:nth-child(3) a')?.textContent || 'Unknown';
                let upc = 'N/A'
                document.querySelectorAll('th').forEach((th) => {
                  if(th.textContent === 'UPC') {
                    upc = th.nextElementSibling?.textContent || 'N/A'
                  }
                })

                return { description, genre, upc }
              });

              // Merge additional details into the book object
              Object.assign(book, { link: fullLink, ...additionalDetails });
            } catch (bookError) {
              console.error(`Error scraping details for book '${book.title}':`, bookError.message);
            }
          }
        }

        // Storing the books in the allBooks array
        allBooks.push(...books)
        console.log(`Books on page ${currentPage}: `, books)
      } catch(error) {
        console.error(`Error scraping page '${currentPage}':`, error.message)
      } // End of scraping try/catch block
      currentPage++
    }

    // Saving data to a file
    fs.writeFileSync('books.json', JSON.stringify(allBooks, null, 2))
    console.log('Data saved to books.json')
  } catch(error) {
    console.error('Error: ', error.message)
  } finally {
    await browser.close()
    console.log('Browser closed.')
  }
// End of scrape function
}

/* INVOKING THE FUNCTION */
scrape()