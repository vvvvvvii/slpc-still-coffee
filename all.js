const lgNum = document.querySelector("#lgNum");
const mdNum = document.querySelector("#mdNum");
const smNum = document.querySelector("#smNum");

function handleNum(size, action) {
  let elem;
  switch (size) {
    case "lg":
      elem = lgNum;
      break;
    case "md":
      elem = mdNum;
      break;
    case "sm":
      elem = smNum;
      break;
  }
  const num = Number(elem.innerHTML);
  if (action === "add") {
    elem.innerHTML = num + 1;
  } else if (num > 0) {
    elem.innerHTML = num - 1;
  }
}
