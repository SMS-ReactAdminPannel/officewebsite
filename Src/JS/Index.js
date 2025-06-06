// Load navbar
fetch("../Component/Navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;

    // Set up nav link click handlers
    document.querySelectorAll("[data-page]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("data-page");
        loadPage(page);
      });
    });
  });

// Load footer
fetch("../Component/Footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

// Function to load a page into the main content area
function loadPage(pageName) {
  fetch(`../HTML/${pageName}.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
    });
}

// Load home page on initial load
window.addEventListener("DOMContentLoaded", () => {
  loadPage("Home");
});
