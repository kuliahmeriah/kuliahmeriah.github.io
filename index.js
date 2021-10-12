// window.addEventListener("load", () => {
//     const preloader = document.querySelector(".loading-page");
//     preloader.style.display = "none";
// })

const getCSS = (e) => {
    return window.getComputedStyle(e,null);
};

// ______________Flex menu
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
    const menuContent = document.querySelector(".menu-content");
    if (menuButton.classList.contains("bi-list")) {
        menuButton.classList.add("bi-x");
        menuButton.classList.remove("bi-list");
        menuContent.style.left = 0;
        document.body.style.overflow = "hidden";
    } else {
        menuButton.classList.add("bi-list");
        menuButton.classList.remove("bi-x");
        menuContent.style.left = "-100%";
        document.body.style.overflow = "visible";
    }
});

// ______________Dropdown sub menu
const menuA = document.querySelector(".menu-a");
menuA.addEventListener("click", () => {
    const target = menuA.lastElementChild;
    if (getCSS(target).display === "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
});

// ______________Full screen
$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
})

// ______________Switch theme
const themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (themeButton.classList.contains("bi-sun")) {
        themeButton.classList.add("bi-moon");
        themeButton.classList.remove("bi-sun");
    } else {
        themeButton.classList.add("bi-sun");
        themeButton.classList.remove("bi-moon");
    }
});