const button = document.getElementById("surpriseBtn");
const messageBox = document.getElementById("touchMessage");

let pressTimer;
let startY = 0;

const messages = [
  "You make my world brighter",
  "I am so lucky to have you",
  "Happy Birthday, my love",
  "Forever us",
  "You are my favorite person"
];

// Tap
button.addEventListener("click", () => {
  showMessage(randomMessage());
  vibrate(50);
});

// Long press
button.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;

  pressTimer = setTimeout(() => {
    showMessage("I love you endlessly");
    vibrate(200);
  }, 700);
});

// Release / Swipe up
button.addEventListener("touchend", (e) => {
  clearTimeout(pressTimer);

  let endY = e.changedTouches[0].clientY;
  if (startY - endY > 80) {
    showMessage("You are my greatest gift");
    vibrate([100, 50, 100]);
  }
});

function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.remove("hidden");
}

function randomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

/* Floating background shapes */
const bg = document.createElement("div");
bg.classList.add("background-shapes");
document.body.appendChild(bg);

setInterval(() => {
  const shape = document.createElement("span");
  shape.style.left = Math.random() * 100 + "vw";
  shape.style.animationDuration = (8 + Math.random() * 6) + "s";
  bg.appendChild(shape);

  setTimeout(() => shape.remove(), 14000);
}, 600);
/* Photo interaction */
const photo = document.getElementById("photo");
const photoWrapper = document.getElementById("photoWrapper");

const photos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg"
];

let currentPhoto = 0;
let photoStartX = 0;

// Tap photo → love message
photoWrapper.addEventListener("click", () => {
  showMessage("Every photo of you is my favorite");
  vibrate(50);
});

// Swipe photo
photoWrapper.addEventListener("touchstart", (e) => {
  photoStartX = e.touches[0].clientX;
});

photoWrapper.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = photoStartX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  }
});

function nextPhoto() {
  currentPhoto = (currentPhoto + 1) % photos.length;
  changePhoto();
}

function prevPhoto() {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  changePhoto();
}

function changePhoto() {
  photo.style.opacity = 0;
  setTimeout(() => {
    photo.src = photos[currentPhoto];
    photo.style.opacity = 1;
  }, 200);
}
