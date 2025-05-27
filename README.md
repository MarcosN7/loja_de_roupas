# Sua Loja de Roupas - Frontend Template

This project is a frontend template for an e-commerce website specializing in clothing for men, women, and children. It's built with HTML, CSS, and a touch of JavaScript for basic interactivity.

## Description

The website features a modern design with the following pages:
- Home Page (`index.html`): Displays hero banner, categories, featured products, about us snippet, and contact form.
- Category Pages (`feminino.html`, `masculino.html`, `infantil.html`): Showcase products for specific categories.
- Product Page (`produto.html`): Detailed view of a single product (template).
- About Us Page (`sobre.html`): Provides more information about the store.
- Contact Page (`contato.html`): Contact form and store information.

## How to Run

Simply open the `index.html` file in your web browser to view the website. No special build steps or local server is required for basic viewing, as it's a static site.

## Project Structure

- **`/` (root):** Contains all HTML files (e.g., `index.html`, `feminino.html`).
- **`assets/`:** Contains all static assets.
  - `assets/images/`: Holds images used for product displays, category previews, and banners.
  - `assets/icons/`: Holds SVG icons used throughout the site (e.g., search, cart, social media).
- **`css/`:**
  - `css/styles.css`: Main stylesheet for the website, containing all visual styling rules.
- **`js/`:**
  - `js/script.js`: Contains JavaScript for interactive elements like the mobile navigation menu.

## Important Note on Asset Links

The links for icons (e.g., `favicon.ico`, `search.svg`, `cart.svg`, social media icons) and the main hero banner image in `css/styles.css` have been updated to use placeholder CDN URLs (e.g., `https://cdn.example.com/...`). **These are not functional links.** You will need to replace these placeholder URLs with the actual URLs where your assets are hosted for them to display correctly.

The original local paths were, for example:
- `assets/icons/favicon.ico`
- `assets/icons/search.svg`
- `assets/images/hero-banner.jpg` (referenced in `css/styles.css`)

Refer to the `DOCUMENTATION.md` file for more details on customization.
