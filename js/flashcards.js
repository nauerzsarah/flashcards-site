import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cards = [];
let current = 0;

export async function loadCards(lang) {
  const snap = await getDocs(collection(db, lang));

  cards = snap.docs.map(doc => doc.data());
  showCard();
}

function showCard() {
  const card = cards[current];

  document.querySelector("#front").innerText = card.front;
  document.querySelector("#back").innerText = card.back;
  document.querySelector("#example").innerText = card.example;
}

window.nextCard = function () {
  current = (current + 1) % cards.length;
  showCard();
};

window.prevCard = function () {
  current = (current - 1 + cards.length) % cards.length;
  showCard();
};

window.flipCard = function () {
  document.querySelector(".card").classList.toggle("flipped");
};
