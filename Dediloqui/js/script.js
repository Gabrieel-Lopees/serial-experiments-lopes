const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let playing = false;

musicToggle.addEventListener("click", () => {

    if (!playing) {
        music.play();
        musicToggle.innerText = "MUSIC: ON";
        playing = true;
    } else {
        music.pause();
        musicToggle.innerText = "MUSIC: OFF";
        playing = false;
    }

});

function fakeGuestbook() {

    const container = document.getElementById("guestbook-messages");

    const newMessage = document.createElement("p");

    newMessage.innerText =
        "> connection registered in the void...";

    container.prepend(newMessage);

}

/* Fake visitor counter */

let counter = localStorage.getItem("visitorCounter");

if (!counter) {
    counter = 0;
}

counter++;

localStorage.setItem("visitorCounter", counter);

document.getElementById("counter").innerText =
    String(counter).padStart(7, "0");

/* Konami Code */

const konami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];

let konamiIndex = 0;

document.addEventListener("keydown", (e) => {

    if (e.key === konami[konamiIndex]) {

        konamiIndex++;

        if (konamiIndex === konami.length) {

            window.location.href = "pages/secret.html";

        }

    } else {

        konamiIndex = 0;

    }

});

/* Hover sounds */

document.querySelectorAll("a, button").forEach(el => {

    el.addEventListener("mouseenter", () => {

        console.log("hover beep");

    });

});
