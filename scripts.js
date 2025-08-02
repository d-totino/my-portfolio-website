document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer dynamically
  fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    initToggleButton(); // reinitialize toggle after header loads
    updatePageInfo(); // add page-specific text
  });


  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

//function for light or dark mode toggle
function initToggleButton() {
  const toggleButton = document.getElementById("mode-toggle");
  const body = document.body;

  //apply saved mode
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "Switch to Light Mode";
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleButton.textContent = "Switch to Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      toggleButton.textContent = "Switch to Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
}

//load blog posts dynamically
if (document.getElementById("blog-container")) {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById("blog-container");
      posts.forEach(post => {
        const article = document.createElement("article");
        article.innerHTML = `
          <h3>${post.title}</h3>
          <p><em>${post.date}</em></p>
          <p>${post.content}</p>
          <hr>
        `;
        container.appendChild(article);
      });
    })
    .catch(error => console.error("Error loading posts:", error));
}

//changes header for each tab of website
function updatePageInfo() {
  const pageInfo = document.getElementById("page-info");
  if (pageInfo) {
    const pageName = window.location.pathname.split("/").pop(); // Get file name
    let message = "";

    if (pageName === "index.html" || pageName === "") {
      message = "- Home Page";
    } else if (pageName === "about.html") {
      message = "- Learn More About Me";
    } else if (pageName === "projects.html") {
      message = "- Explore My Projects";
    } else if (pageName === "blog.html") {
      message = "- Check Out My Blog";
    } else if (pageName === "contact.html") {
      message = "- Get in Touch";
    }

    pageInfo.textContent = ` ${message}`;
  }
}


