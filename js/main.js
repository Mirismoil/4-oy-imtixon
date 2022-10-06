let trBody = document.body.querySelector(".tb-body");
let body = document.body.querySelector(".body");
const localCurrencies = localStorage.getItem("currencies");

let currencies = [];

if (localCurrencies) currencies = JSON.parse(localCurrencies);

async function getData(url) {
  try {
    const newData = await fetch(url);
    const { data } = await newData.json();

    currencies = data;

    localStorage.setItem("currencies", JSON.stringify(data));
  } catch (err) {
    console.log("Internetni qaytadan yuklang" + err);
  }
}

getData("https://pressa-exem.herokuapp.com/api-49");

console.log(currencies);

function render(currencies) {
  trBody.textContent = "";

  for (let i = 0; i < currencies.length; i++) {
    let newTr = document.createElement("tr");
    let newTd = document.createElement("td");
    newTd.textContent = currencies[i].Code;
    let newTd1 = document.createElement("td");
    newTd1.textContent = currencies[i].CcyNm_UZ;
    let newTd2 = document.createElement("td");

    newTd2.textContent = currencies[i].Ccy;

    let newTd3 = document.createElement("td");

    newTd3.textContent = currencies[i].Diff;

    let newTd4 = document.createElement("td");
    newTd4.textContent = currencies[i].Date;
    let newbtn = document.createElement("button");
    newbtn.className = "btn btn-warning";
    let icon = document.createElement("img");
    icon.src = "../../img/logo.svg";
    newbtn.append(icon);

    newTr.append(newTd, newTd1, newTd2, newTd3, newTd4, newbtn);
    trBody.appendChild(newTr);
  }
}
render(currencies);
// --------------------sort
let select = document.body.querySelector(".form-select");

select.addEventListener("change", (e) => {
  const sortingType = e.target.value;
  let newData;
  if (sortingType == "1") {
    console.log("Expensive");
    newData = [...currencies].sort((a, b) => {
      if (a.Diff < b.Diff) return -1;
      if (a.Diff > b.Diff) return 1;
      return 0;
    });
  } else if (sortingType == "2") {
    console.log("Chip");
    newData = [...currencies].sort((b, a) => {
      if (a.Diff < b.Diff) return -1;
      if (a.Diff > b.Diff) return 1;
      return 0;
    });
  } else {
    newData = currencies;
  }
  render(newData);
});

// ------------------------seorch
let input = document.body.querySelector(".form-control");
input.addEventListener("input", (e) => {
  const searchType = e.target.value.trim();

  let newData;

  newData = [...currencies].filter((el) => {
    const diff = +el.Diff;
    if (diff >= searchType) {
      return el;
    }
  });

  render(newData);
});
// ------------------------------spiner
let img = document.querySelector(".stop-img");
setTimeout(() => {
  img.style.display = "block";
}, 10);
setTimeout(() => {
  img.style.display = "none";
}, 500);

let result = localStorage.getItem("result");

setTimeout(() => {
  if (!result) {
    modalBtn.click();
    localStorage.setItem("result", JSON.stringify("result"));
  }
}, 10000);
let btn = document.getElementById("btnModal");
// let modals = document.body.querySelector("modal")
let modal = window.localStorage.getItem("modal");

setTimeout(() => {
  if (!modal) {
    btn.click();
    localStorage.setItem("modal", "modal");
  }
}, 5000);
