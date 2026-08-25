function toggleMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navActions = document.querySelector(".nav-actions");
    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navActions.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });
}
toggleMenu();