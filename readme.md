# Web Scraper with Puppeteer

## 📄 Introduction
This project is a web scraper built using Node.js and Puppeteer. It extracts information about books from the [Books to Scrape](https://books.toscrape.com) website, including:

- **Title**
- **Price**
- **Stock availability**
- **Rating**
- **Link**

Optionally, it also scrapes additional details for each book:

- **Description**
- **Genre**
- **UPC (Universal Product Code)**

Scraped data is saved as a JSON file for further processing or analysis.

## 📑 Features
- Scrapes multiple pages of books with pagination support.
- Option to include detailed information for each book.
- Saves data in a structured JSON format.
- Command-line arguments and environment variables for flexibility.

## 🛠️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MartinXCVI/node-web-scraper.git
   cd node-web-scraper
   ```

2. Navigate to the project directory:
   ```bash
   cd node-web-scraper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 📄 Usage
Run the script with Node.js:

```bash
node scrape.js [maxPages] [scrapeDetails]
```

### Arguments
- `maxPages` (optional): Number of pages to scrape (default: `10`).
- `scrapeDetails` (optional): Set to `true` to include additional book details (default: `false`).

### Environment Variables
Alternatively, you can use environment variables:

- `MAX_PAGES`: Number of pages to scrape.
- `SCRAPE_DETAILS`: Set to `true` to include additional book details.

### Example
To scrape 5 pages with detailed book information:
```bash
node scrape.js 5 true
```

Or using environment variables:
```bash
MAX_PAGES=5 SCRAPE_DETAILS=true node scrape.js
```

### Output
The scraped data is saved to a file named `books.json` in the project directory. The data format looks like this:

```json
[
  {
    "title": "A Light in the Attic",
    "price": "£51.77",
    "stock": "In stock",
    "rating": "Three",
    "link": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    "description": "It's hard to imagine a world without A Light in the Attic...",
    "genre": "Poetry",
    "upc": "a897fe39b1053632"
  },
  ...
]
```

## 🚫 Errors Handling
- If a page fails to load, the script logs an error and moves to the next page.
- If additional details for a book fail to scrape, the error is logged, and the script continues with the next book.

## 📚 Learn More
- [Node.js latest documentation](https://nodejs.org/docs/latest/api/)
- [Puppeteer official documentation](https://pptr.dev/category/introduction)
- [Books to Scrape website](https://books.toscrape.com/)

## 🧑‍💻 Developer:

- [**MartinXCVI**](https://github.com/MartinXCVI)

---

Feel free to contribute, modify or adapt this project to your needs. 🤝