/* ------------------------------
   ELEMENTS
-------------------------------*/
const footerBar = document.getElementById("footerSwipeBar");
const footerProgress = document.getElementById("footerProgressFill");
const footerMessage = document.getElementById("footerMessage");

const popupBox = document.getElementById("popupBox");
const popupText = document.getElementById("popupText");
const popupClose = document.getElementById("popupClose");

const animationPopup = document.getElementById("animationPopup");
const animationClose = document.getElementById("animationClose");
const photoWrapper = document.getElementById("photoWrapper");

const surpriseBtn = document.getElementById("surpriseBtn");
const touchMessage = document.getElementById("touchMessage");

const floatingBackground = document.getElementById("floatingBackground");

/* ------------------------------
   FORCE HIDDEN ON LOAD
-------------------------------*/
animationPopup.classList.add("hidden");

/* ------------------------------
   LOVE MESSAGES
-------------------------------*/
const messages = [
  "Happy Birthday Mamheee lovelove! You are my greatest gift",
  "You make my world brighter",
  "I am so blessed to have you",
  "Forever and always nani mamheee, iloveyouuumorethananything",
  "You are my favorite person",
  "Wishing you all the happiness in the world",
  "Enjoy your special day to the fullest!",
  "You deserve all the love and joy today and always",
  "Thank you for being you, mamheee!",
  "Here's to many more birthdays together!",
];

/* ------------------------------
   HELPERS
-------------------------------*/
function vibrate(pattern = 50) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function randomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function showTouchMessage(text) {
  touchMessage.textContent = text;
  touchMessage.classList.remove("hidden");
}

function showPopup(text) {
  popupText.textContent = text;
  popupBox.classList.remove("hidden");
}

/* ------------------------------
   BUTTON TAP
-------------------------------*/
surpriseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showTouchMessage(randomMessage());
  vibrate(50);
});

/* ------------------------------
   CLOSE TEXT POPUP
-------------------------------*/
popupClose.addEventListener("click", () => {
  popupBox.classList.add("hidden");
});

/* ------------------------------
   FOOTER SWIPE
-------------------------------*/
let startY = 0;
let isDragging = false;
const swipeThreshold = 90;

footerBar.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  isDragging = true;
});

footerBar.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  updateProgress(startY - e.touches[0].clientY);
});

footerBar.addEventListener("touchend", finishSwipe);

footerBar.addEventListener("mousedown", (e) => {
  startY = e.clientY;
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  updateProgress(startY - e.clientY);
});

document.addEventListener("mouseup", finishSwipe);

function updateProgress(diff) {
  diff = Math.max(0, Math.min(diff, swipeThreshold));
  footerProgress.style.width = (diff / swipeThreshold) * 100 + "%";
  footerMessage.textContent =
    diff < swipeThreshold ? "Swipe Up to Reveal" : "Almost there...";
}

function finishSwipe() {
  if (!isDragging) return;

  if (parseInt(footerProgress.style.width) >= 100) {
    showPopup(randomMessage());
    vibrate([100, 50, 100]);
  }

  footerProgress.style.width = "0%";
  footerMessage.textContent = "Swipe Up to Reveal";
  isDragging = false;
}

/* ------------------------------
   IMAGE CLICK → ANIMATION POPUP
   (ONLY PLACE IT OPENS)
-------------------------------*/
photoWrapper.addEventListener("click", () => {
  animationPopup.classList.remove("hidden");
  vibrate([100, 50, 100]);
});

animationClose.addEventListener("click", () => {
  animationPopup.classList.add("hidden");
});

/* ------------------------------
   FLOATING BACKGROUND
-------------------------------*/
function createFloatingCircle() {
  const circle = document.createElement("div");
  circle.className = "floatingCircle";

  const size = Math.random() * 40 + 10;
  circle.style.width = size + "px";
  circle.style.height = size + "px";
  circle.style.left = Math.random() * 100 + "%";
  circle.style.animationDuration = Math.random() * 5 + 5 + "s";

  floatingBackground.appendChild(circle);

  setTimeout(() => circle.remove(), 10000);
}

setInterval(createFloatingCircle, 300);
