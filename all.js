const yirgacheffeLgNum = document.querySelector("#yirgacheffeLgNum");
const yirgacheffeMdNum = document.querySelector("#yirgacheffeMdNum");
const yirgacheffeSmNum = document.querySelector("#yirgacheffeSmNum");

const costaricaLgNum = document.querySelector("#costaricaLgNum");
const costaricaMdNum = document.querySelector("#costaricaMdNum");
const costaricaSmNum = document.querySelector("#costaricaSmNum");

const minusBtns = document.querySelectorAll(".minus-btn");
const addBtns = document.querySelectorAll(".add-btn");

const totalPrice = document.querySelector("#totalPrice");

function handleNum(elemName, action) {
  let elem;
  switch (elemName) {
    case "yirgacheffeLgNum":
      elem = yirgacheffeLgNum;
      break;
    case "yirgacheffeMdNum":
      elem = yirgacheffeMdNum;
      break;
    case "yirgacheffeSmNum":
      elem = yirgacheffeSmNum;
      break;
    case "costaricaLgNum":
      elem = costaricaLgNum;
      break;
    case "costaricaMdNum":
      elem = costaricaMdNum;
      break;
    case "costaricaSmNum":
      elem = costaricaSmNum;
      break;
  }
  const num = Number(elem.innerHTML);
  if (action === "add") {
    elem.innerHTML = num + 1;
  } else if (num > 0) {
    elem.innerHTML = num - 1;
  }
  calcPrice();
}

function calcPrice() {
  const total =
    (Number(yirgacheffeLgNum.innerHTML) + Number(costaricaLgNum.innerHTML)) *
      600 +
    (Number(yirgacheffeMdNum.innerHTML) + Number(costaricaMdNum.innerHTML)) *
      360 +
    (Number(yirgacheffeSmNum.innerHTML) + Number(costaricaSmNum.innerHTML)) *
      150;
  totalPrice.innerHTML = total;
}

// plugins

AOS.init();

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.5,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    540: {
      slidesPerView: 2.5,
    },
    768: {
      slidesPerView: 3.5,
    },
  },
});
