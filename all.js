const formID = "1FAIpQLSd7BEwIKYUZMfhp_9t4qSWZM-ZTgy-iOxoI5Q56azFnVK4InQ";

const yirgacheffeLgNum = document.querySelector("#yirgacheffeLgNum");
const yirgacheffeMdNum = document.querySelector("#yirgacheffeMdNum");
const yirgacheffeSmNum = document.querySelector("#yirgacheffeSmNum");

const costaricaLgNum = document.querySelector("#costaricaLgNum");
const costaricaMdNum = document.querySelector("#costaricaMdNum");
const costaricaSmNum = document.querySelector("#costaricaSmNum");

const minusBtns = document.querySelectorAll(".minus-btn");
const addBtns = document.querySelectorAll(".add-btn");

const alertMsg = document.querySelector("#alertMsg");
const totalPrice = document.querySelector("#totalPrice");
const suggestCouponNum = document.querySelector("#suggestCouponNum");

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
      350 +
    (Number(yirgacheffeSmNum.innerHTML) + Number(costaricaSmNum.innerHTML)) *
      150;
  totalPrice.innerHTML = total;
  suggestCouponNum.innerHTML = Math.round(total / 200);

  if (total !== 0) {
    $("#submitBtn").prop("disabled", false);
    $("#suggestCouponHint").removeClass("d-none");
  } else {
    $("#suggestCouponHint").addClass("d-none");
    $("#submitBtn").prop("disabled", true);
  }
}
function organizeBooking() {
  let booking = [
    {
      type: "耶加雪非",
      size: "量販盒",
      num: yirgacheffeLgNum.innerHTML,
    },
    {
      type: "耶加雪非",
      size: "精緻禮盒",
      num: yirgacheffeMdNum.innerHTML,
    },
    {
      type: "耶加雪非",
      size: "淺嚐輕量",
      num: yirgacheffeSmNum.innerHTML,
    },
    {
      type: "哥斯大黎加",
      size: "量販盒",
      num: costaricaLgNum.innerHTML,
    },
    {
      type: "哥斯大黎加",
      size: "精緻禮盒",
      num: costaricaMdNum.innerHTML,
    },
    {
      type: "哥斯大黎加",
      size: "淺嚐輕量",
      num: costaricaSmNum.innerHTML,
    },
  ];
  booking = booking.filter((item) => item.num != 0);
  let result = "";
  booking.forEach((item, key) => {
    result += `${item.type}${item.size} * ${item.num}`;
    if (key + 1 !== booking.length) {
      result += " , ";
    }
  });
  return result;
}
function checkBlankInput(name, contact, date) {
  const checkArr = [
    { name: name, errorMsg: "#errorInfoName" },
    { name: contact, errorMsg: "#errorInfoContact" },
    { name: date, errorMsg: "#errorInfoDate" },
  ];

  if (checkArr.some((item) => item.name.length === 0)) {
    alert("有東西沒填到唷！");
  }
  checkArr.forEach((item) => {
    if (item.name.length === 0) {
      $(item.errorMsg).removeClass("d-none");
      return;
    }
    $(item.errorMsg).addClass("d-none");
  });
  return checkArr.every((item) => item.name.length !== 0);
}
function sendData(data) {
  const url = `https://docs.google.com/forms/d/e/${formID}/formResponse`;
  $.ajax({
    type: "POST",
    url,
    data,
    contentType: "application/json",
    dataType: "jsonp",
    complete: function () {
      handleAlert();
      resetForm();
      window.scrollTo(0, 0);
    },
  });
}
function handleAlert() {
  // alertMsg
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="alert alert-success w-50" role="alert">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="alert-heading">
          <i class="bi bi-send-check-fill me-1"></i>
          謝謝您的訂購！
        </h4>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <hr>
      <p>
        我們已收到您的訂單。願神與您同在，賜給您真實的平安！
      </p>
    </div>
  `;
  alertMsg.append(wrapper);
}
function resetForm() {
  yirgacheffeLgNum.innerHTML = "0";
  yirgacheffeMdNum.innerHTML = "0";
  yirgacheffeSmNum.innerHTML = "0";
  costaricaLgNum.innerHTML = "0";
  costaricaMdNum.innerHTML = "0";
  costaricaSmNum.innerHTML = "0";
  totalPrice.innerHTML = "0";
  suggestCouponNum.innerHTML = "0";

  $("#suggestCouponHint").addClass("d-none");
  $("#customerName").val("");
  $("#contactInfo").val("");
  $("#pickDate").val("");
  $("#couponAmount").val("");
}

$(function () {
  $("#submitBtn").on("click", function () {
    responseName = $("#customerName").val();
    responseContact = $("#contactInfo").val();
    responseDate = $("#pickDate").val() || "";
    booking = organizeBooking();
    couponAmount = $("#couponAmount").val() || "";

    const readyToSend = checkBlankInput(
      responseName,
      responseContact,
      responseDate
    );
    let data = {
      "entry.1129597226": `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
      "entry.1607366895": responseName,
      "entry.643988750": responseContact,
      "entry.1329456624": responseDate,
      "entry.927790745": booking,
      "entry.898565931": couponAmount,
    };

    if (readyToSend) {
      sendData(data);
    }
  });
});

// plugins

AOS.init();
