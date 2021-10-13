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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyD-wdntjWov9iQcWBngnymINLaYsVzgnZE",
authDomain: "kuliahmeriah-c4c39.firebaseapp.com",
projectId: "kuliahmeriah-c4c39",
storageBucket: "kuliahmeriah-c4c39.appspot.com",
messagingSenderId: "572803293318",
appId: "1:572803293318:web:30c1de3b75964a94e7b107",
measurementId: "G-EDF0YGTY7S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

// -------------------------------------------------------------------

// liking data
const likeCount = db.collection('belanegara_images').doc('belanegara_1');
const likeButton = document.querySelector('.belanegara1-likes');
likeButton.addEventListener('click', (e) => {
    console.log("Berhasil menambahkan like");
    likeCount.update({
        like_count: firebase.firestore.FieldValue.increment(1)
    });
    likeButton.style.color = 'red';
})

db.collection("belanegara_images").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        document.querySelector('.like-count').innerHTML = doc.data().like_count;
    });
});