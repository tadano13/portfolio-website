# Minimalist Developer Portfolio Template

A clean, modern, and fully responsive personal portfolio website designed for developers. This template automatically fetches and displays your GitHub projects in a sleek, horizontally-scrollable slider.

<!-- It's a good practice to add a screenshot of your project -->

## ✨ Features

* **Dynamic Project Showcase**: Automatically fetches your public repositories from the GitHub API and displays them in a project slider.
* **Interactive Slider**: Use your mouse to click and drag the project section, or use the left and right arrow keys to navigate.
* **Auto-Calculating Age**: The "About Me" section dynamically calculates and displays your current age from your date of birth.
* **Contact Modal**: A clean, pop-up modal with multiple contact options (Discord, Gmail, Instagram) to prevent mail clients from opening unexpectedly.
* **Responsive Design**: Looks great on all devices, from mobile phones to desktop computers.
* **Easy to Customize**: Built with simple HTML, CSS, and vanilla JavaScript. No complex frameworks or build steps required.

## 📂 Project Structure

The project is organized into three simple files:

```
/
├── 📄 index.html      # Contains all the content and structure of the website.
├── 🎨 style.css       # All styling rules for layout, colors, and fonts.
└── 📜 script.js       # Handles API calls, age calculation, and interactivity.
```

## 🚀 How to Use & Deploy

You can easily use this project as a template for your own portfolio. Here’s how:

### 1. Get the Code

Clone or download this repository to your local machine.

```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
```

### 2. Customize the Content

Open the files in your favorite code editor and make the following changes:

**In `index.html`:**
* **Personal Information**: Update the text in the "Hero," "About Me," and "Education" sections with your own details.
* **Technologies & Interests**: Change the text in the `.tech-card` elements to reflect your skills.
* **Contact Links**: Update the `href` attributes in the contact modal with your own social media links.

**In `script.js`:**
* **GitHub Username**: On line 5, change `'tadano13'` to your GitHub username. This is crucial for fetching your projects.
  ```javascript
  const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME'; 
  ```
* **Date of Birth**: On line 7, change the date to your own birthday to ensure the age calculation is correct.
  ```javascript
  const BIRTH_DATE = 'YYYY-MM-DD';
  ```

**In the main folder:**
* **Replace Images**:
  * Replace `app-development.png` with your own logo (or remove it).
  * Replace `hero-image.png` with your own illustration or photo.

### 3. Deploy Your Website

This is a static website, so you can host it for free on several platforms:

* **GitHub Pages**: The easiest way is to push your repository to GitHub and enable GitHub Pages in the repository settings.
* **Vercel**: Sign up with your GitHub account and import the repository. Vercel will automatically build and deploy it.
* **Netlify**: Similar to Vercel, connect your GitHub account, import the repository, and Netlify will handle the rest.

## 🎨 Design Credits

The design for this portfolio was inspired by a graphic reference poster discovered on Pinterest. A huge thanks to the original creator for the inspiration!

* **Original Creator**: MACHmomo
* **Pinterest Profile**: [https://in.pinterest.com/MACHmomo/](https://in.pinterest.com/MACHmomo/)

## 🤝 Contributing & License

Feel free to fork this repository, make it your own, and share it with others. This project is open-source and available under the **MIT License**. See the `LICENSE` file for more details.
