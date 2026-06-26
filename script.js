const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}
dropdown.forEach((select) => {
select.addEventListener("change", (e) => {
  UpdateFlag(e.target);
  updateExchangeRate();
})});

const UpdateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click",(e) => {
  e.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate =async()=>{
  let amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);
  let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response=await fetch(URL);
  let data=await response.json();
 const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  if (!amtVal || amtVal <= 0 || Number.isNaN(amtVal)) {
    msg.innerText=`1 ${fromCurr.value} = ${rate.toFixed(2)} ${toCurr.value}`;
    return;
  }
  let finalAmt=amtVal*rate;
msg.innerText=`${amount.value} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
updateExchangeRate();
})