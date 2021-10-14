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

// liking like
const data_gambar1 = db.collection('belanegara_images').doc('belanegara_1');
const likeButton1 = document.querySelector('.belanegara1-likes');
likeButton1.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Berhasil menambahkan like");
    data_gambar1.update({
        like_count: firebase.firestore.FieldValue.increment(1)
    });
    likeButton1.style.color = 'red';
    likeButton1.classList.add('disabled-button');
})

// getting likes
db.collection("belanegara_images").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("like_count: ", doc.data().like_count);

        document.querySelector('.namaGambar').innerHTML = doc.data().nama_gambar;
        document.querySelector('.likeCount').innerHTML = doc.data().like_count;
        document.querySelector('.jumlahKomen1').innerHTML = doc.data().jumlah_komen;
        document.querySelector('.jumlahKomen2').innerHTML = doc.data().jumlah_komen;
    });
});

// -------------------------------------------------------------------

// saving comment
const komen_gambar1 = document.querySelector('.tambahKomen');
komen_gambar1.addEventListener('submit', (e) => {
    e.preventDefault();
    data_gambar1.collection('belanegara_1_comments').add({
        isi_komen: komen_gambar1.isiKomen.value
    });
    data_gambar1.update({
        jumlah_komen: firebase.firestore.FieldValue.increment(1)
    });
    komen_gambar1.isiKomen.value='';
})

// getting comments
const tampilKomenButton = document.querySelector('.tampilKomen');
const sembunyiKomenButton = document.querySelector('.sembunyiKomen');
const daftarKomen = document.querySelector('.daftarKomen');
tampilKomenButton.addEventListener('click', (e) => {
    e.preventDefault();
    sembunyiKomenButton.style.display = "block";
    tampilKomenButton.style.display = "none";
    data_gambar1.collection('belanegara_1_comments').orderBy('isi_komen').get().then((querySnapshot) => {
        querySnapshot.docs.forEach(doc => {
            console.log("isi_komen: ", doc.data().isi_komen);
            tampilKomen(doc.data().isi_komen);
        })
    })
})
sembunyiKomenButton.addEventListener('click', (e) => {
    e.preventDefault();
    sembunyiKomenButton.style.display = "none";
    tampilKomenButton.style.display = "block";
    sembunyiKomen();
})
tampilKomen = ((isi_komen) => {
    let li = document.createElement('li');
    li.classList.add('itemKomen');
    let isiKomen = document.createElement('span');
    isiKomen.textContent = isi_komen;
    li.appendChild(isiKomen);
    daftarKomen.appendChild(li);
});
sembunyiKomen = (() => {
    daftarKomen.innerHTML = '';
});