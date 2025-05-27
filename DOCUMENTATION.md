# Website Documentation - Sua Loja de Roupas

This document provides detailed information about the structure and customization of the "Sua Loja de Roupas" frontend template.

## Table of Contents

1.  [Overview](#overview)
2.  [File Structure](#file-structure)
3.  [Key Components and Customization](#key-components-and-customization)
    *   [HTML Pages](#html-pages)
    *   [Header and Navigation](#header-and-navigation)
    *   [Footer](#footer)
    *   [Styling (CSS)](#styling-css)
    *   [Assets (Images and Icons)](#assets-images-and-icons)
    *   [JavaScript (`js/script.js`)](#javascript-jsscriptjs)
4.  [Customization Tips](#customization-tips)
    *   [Changing Text Content](#changing-text-content)
    *   [Adding/Updating Products](#addingupdating-products)
    *   [Adding/Updating Categories](#addingupdating-categories)
    *   [Modifying Asset Links](#modifying-asset-links)
5.  [Deployment](#deployment)

## 1. Overview

This project is a static HTML, CSS, and JavaScript frontend for an online clothing store. It's designed to be easily customizable. All content is directly in the HTML files, and styling is managed through `css/styles.css`.

## 2. File Structure

- **`/` (root):** Contains all HTML files (e.g., `index.html`, `feminino.html`).
  - `README.md`: This file. General project information.
  - `DOCUMENTATION.md`: This file. Detailed documentation.
- **`assets/`:** Contains all static assets.
  - `assets/images/`: Holds images used for product displays, category previews, banners (e.g., `hero-banner.jpg`, `product1.jpg`).
  - `assets/icons/`: Holds SVG icons used throughout the site (e.g., `search.svg`, `cart.svg`, `facebook.svg`, `instagram.svg`, `user.svg`) and the `favicon.ico`.
- **`css/`:**
  - `css/styles.css`: Main stylesheet for the website.
- **`js/`:**
  - `js/script.js`: JavaScript for interactive features like the mobile menu.

## 3. Key Components and Customization

### HTML Pages

Each `.html` file in the root directory represents a page on the website:
- `index.html`: The main landing page.
- `feminino.html`, `masculino.html`, `infantil.html`: Category-specific product listing pages.
- `produto.html`: A template for displaying a single product's details. You would typically duplicate and modify this for each product or load data dynamically if using a backend.
- `sobre.html`: The "About Us" page.
- `contato.html`: The "Contact Us" page with a form and contact details.

### Header and Navigation

- **Location:** The `<header class="main-header">` element is present in every HTML file.
- **Logo:** The logo is currently text-based: `<a href="index.html" class="logo">SUA LOGO</a>`. To change it to an image, you would replace "SUA LOGO" with an `<img>` tag pointing to your logo file. Remember to update the CSS if needed to style the image logo.
- **Navigation Links:** Modify the `<li><a href="...">...</a></li>` elements within `<nav class="main-nav">` in each HTML file to change navigation items. The `active` class on a `nav-link` can be used to highlight the current page, but this is not dynamically set in the current static version.

### Footer

- **Location:** The `<footer class="main-footer">` element is present in every HTML file.
- **Content:** The footer contains quick links, store information, and social media links. Edit the content directly within this section in each HTML file.

### Styling (CSS)

- **Main Stylesheet:** `css/styles.css` controls the entire visual appearance.
- **CSS Variables:** At the top of `styles.css` (within `:root`), common properties like primary color (`--primary-color`), text color (`--text-color`), and fonts (`--font-family-base`) are defined. Changing these variables will update their usage throughout the site.
  ```css
  :root {
      --primary-color: #5C6AC4;
      --text-color: #333;
      /* ... other variables */
  }
  ```
- **Structure:** The CSS is organized into sections: Reset, Global Styles, Header, Hero Section, Categories, Products, About, Contact, Footer, and Responsive Media Queries.
- **Customization:** To change styles, identify the relevant CSS rule in `styles.css` and modify its properties. For new elements, add new rules.

### Assets (Images and Icons)

- **Location:** All images are expected to be in `assets/images/` and icons in `assets/icons/`.
- **Current State - Placeholder Links:**
    - **Icons:** References to icons (e.g., `favicon.ico`, `search.svg`, `user.svg`, `cart.svg`, `instagram.svg`, `facebook.svg`) in all HTML files have been changed from local paths (e.g., `assets/icons/search.svg`) to placeholder CDN URLs (e.g., `https://cdn.example.com/icons/search.svg`).
    - **Hero Banner:** The hero banner image in `css/styles.css` (`.hero-section`) has been changed from `url('../assets/images/hero-banner.jpg')` to `url('https://cdn.example.com/images/hero-banner.jpg')`.
- **Action Required:** You **MUST** replace these placeholder URLs with the actual, publicly accessible URLs where your assets are hosted. If you intend to keep them local, you'll need to revert these paths back to their original local format (e.g., `assets/icons/search.svg`).
- **Other Images:** Product images, category images, and the "about us" image are still referenced using local paths (e.g., `assets/images/product1.jpg`). If you move these to a CDN, their paths will also need to be updated in the HTML files.

### JavaScript (`js/script.js`)

- **Functionality:** The `js/script.js` file currently handles:
    - **Mobile Menu Toggle:** Manages the opening and closing of the navigation menu on smaller screens (hamburger menu).
    - **Cart Icon Count (Basic):** Includes a placeholder for updating the cart item count. Currently, it doesn't have full e-commerce cart functionality. Buttons with class `add-to-cart-btn` exist, but their interaction with the cart count might be basic or require further development for a full cart system.
- **Review:** It's advisable to review `js/script.js` to understand its exact behavior, especially if planning to expand its features. (A future step in the plan is to add more comments to this file).

## 4. Customization Tips

### Changing Text Content

Most text (headings, paragraphs, product descriptions, prices) can be edited directly in the HTML files.

### Adding/Updating Products

- **Featured Products (Home Page):** Edit the `.product-card` divs within the `<section id="produtos-destaque">` in `index.html`.
- **Category Pages:** Edit the `.product-card` divs within the `<section class="category-products-section">` in `feminino.html`, `masculino.html`, etc.
- **Product Detail Page (`produto.html`):** This is a template. To add a new product detail page, you might copy `produto.html`, rename it (e.g., `produto_camisa_nova.html`), and update its content (image, title, price, description). Then link to this new page from the product listings.

For each product, you'll typically update:
- Image `src` and `alt` text.
- Product name (e.g., `<h3>Camisa Elegante</h3>`).
- Product price (e.g., `<p class="product-price">R$ 129,90</p>`).
- Links and button `data-product-id` if you plan to implement JavaScript-based cart functionality.

### Adding/Updating Categories

- **Home Page Links:** Update the `.category-card` links in `index.html` in the `<section id="categorias">`.
- **Navigation:** Update the main navigation in the `<header>` of all HTML files.
- **New Category Page:** If adding a new category (e.g., "Shoes"), you would typically:
    1. Create a new HTML file (e.g., `sapatos.html`) by copying an existing category page.
    2. Update its content with products for the new category.
    3. Add a link to `sapatos.html` in the main navigation and potentially on the home page's category section.

### Modifying Asset Links

As mentioned in the [Assets section](#assets-images-and-icons), ensure all placeholder CDN links are updated to your actual asset URLs. If you are using local assets, revert the paths.

For example, in an HTML file:
- Change `<img src="https://cdn.example.com/icons/search.svg" ...>` to `<img src="your_actual_cdn_link/search.svg" ...>` or back to `<img src="assets/icons/search.svg" ...>`.

In `css/styles.css`:
- Change `background: url('https://cdn.example.com/images/hero-banner.jpg') ...` to `background: url('your_actual_cdn_link/hero-banner.jpg') ...` or back to `background: url('../assets/images/hero-banner.jpg') ...`.

## 5. Deployment

This is a static website. To deploy it:
1.  Ensure all asset paths (images, icons) are correct for your deployment environment (i.e., placeholder CDN links are updated, or local paths are correctly structured).
2.  Upload all files and folders (`.html` files, `assets/`, `css/`, `js/`) to a web server or a static site hosting provider.
    *   Examples of hosting providers: Netlify, Vercel, GitHub Pages, AWS S3, Firebase Hosting.
3.  No special build process is required. The site is served as is.

---

This documentation should help you get started with customizing your online store.
