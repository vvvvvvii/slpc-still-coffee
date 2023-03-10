const formID = "1FAIpQLSd7BEwIKYUZMfhp_9t4qSWZM-ZTgy-iOxoI5Q56azFnVK4InQ";

const yirgacheffeLgNum = document.querySelector("#yirgacheffeLgNum");
const yirgacheffeMdNum = document.querySelector("#yirgacheffeMdNum");
const yirgacheffeSmNum = document.querySelector("#yirgacheffeSmNum");

const costaricaLgNum = document.querySelector("#costaricaLgNum");
// const costaricaMdNum = document.querySelector("#costaricaMdNum");
const costaricaSmNum = document.querySelector("#costaricaSmNum");

const minusBtns = document.querySelectorAll(".minus-btn");
const addBtns = document.querySelectorAll(".add-btn");

const alertSuccessMsg = document.querySelector("#alertSuccessMsg");
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
    // case "costaricaMdNum":
    //   elem = costaricaMdNum;
    //   break;
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
    Number(yirgacheffeMdNum.innerHTML) * 350 +
    (Number(yirgacheffeSmNum.innerHTML) + Number(costaricaSmNum.innerHTML)) *
      150;
  totalPrice.innerHTML = total;
  suggestCouponNum.innerHTML = Math.ceil(total / 200);

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
      type: "????????????",
      size: "?????????",
      num: yirgacheffeLgNum.innerHTML,
    },
    {
      type: "????????????",
      size: "????????????",
      num: yirgacheffeMdNum.innerHTML,
    },
    {
      type: "????????????",
      size: "????????????",
      num: yirgacheffeSmNum.innerHTML,
    },
    {
      type: "???????????????",
      size: "?????????",
      num: costaricaLgNum.innerHTML,
    },
    // {
    //   type: "???????????????",
    //   size: "????????????",
    //   num: costaricaMdNum.innerHTML,
    // },
    {
      type: "???????????????",
      size: "????????????",
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
    handleAlert("????????????????????????");
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
      handleAlert("success");
      resetForm();
      window.scrollTo(0, 0);
    },
  });
}
function handleAlert(msg) {
  const wrapper = document.createElement("div");
  if (msg === "success") {
    wrapper.innerHTML = `
      <div class="alert alert-success w-50" role="alert">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="alert-heading">
            <i class="bi bi-send-check-fill me-1"></i>
            ?????????????????????
          </h4>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <hr>
        <p>
          ??????????????????????????????????????????????????????????????????????????????
        </p>
      </div>
    `;
    alertSuccessMsg.append(wrapper);
  } else {
    wrapper.innerHTML = `
      <div class="alert alert-warning w-50" role="alert">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="alert-heading">
            <i class="bi bi-send-check-fill me-1"></i>
            ${msg}
          </h4>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <hr>
      </div>
    `;
    alertMsg.append(wrapper);
  }
}
function resetForm() {
  yirgacheffeLgNum.innerHTML = "0";
  yirgacheffeMdNum.innerHTML = "0";
  yirgacheffeSmNum.innerHTML = "0";
  costaricaLgNum.innerHTML = "0";
  // costaricaMdNum.innerHTML = "0";
  costaricaSmNum.innerHTML = "0";
  totalPrice.innerHTML = "0";
  suggestCouponNum.innerHTML = "0";

  $("#suggestCouponHint").addClass("d-none");
  $("#customerName").val("");
  $("#contactInfo").val("");
  $("#pickDate").val("");
  $("#couponAmount").val("");
  $("#submitBtn").html("????????????");
  $("#submitBtn").prop("disabled", false);
}

$(function () {
  $("#submitBtn").on("click", function () {
    $("#submitBtn").html("LOADING...");
    $("#submitBtn").prop("disabled", true);

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
      "entry.955169935": yirgacheffeLgNum.innerHTML,
      "entry.1098334062": yirgacheffeMdNum.innerHTML,
      "entry.63299201": yirgacheffeSmNum.innerHTML,
      "entry.709186585": costaricaLgNum.innerHTML,
      // "entry.1040293675": costaricaMdNum.innerHTML,
      "entry.1040293675": 0,
      "entry.780868373": costaricaSmNum.innerHTML,
    };

    if (readyToSend) {
      sendData(data);
    } else {
      $("#submitBtn").html("????????????");
      $("#submitBtn").prop("disabled", false);
    }
  });
});

// plugins

AOS.init();
