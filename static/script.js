function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
