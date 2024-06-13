let select = document.querySelectorAll('.currency');
let btn = document.getElementById('btn');
let swapBtn = document.getElementById('swap');
let input = document.getElementById('input');
let result = document.getElementById('result');

fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(res => displayDropDown(res));

function displayDropDown(res) {
  let currencies = Object.entries(res);
  currencies.forEach(currency => {
    let option = `<option value="${currency[0]}">${currency[1]}</option>`;
    select[0].innerHTML += option;
    select[1].innerHTML += option;
  });
}

btn.addEventListener('click', () => {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputVal = input.value;

  if (curr1 === curr2) {
    alert("Choose different currencies");
  } else if (inputVal <= 0) {
    alert("Enter a valid amount");
  } else {
    convert(curr1, curr2, inputVal);
  }
});

swapBtn.addEventListener('click', () => {
  let temp = select[0].value;
  select[0].value = select[1].value;
  select[1].value = temp;
});

function convert(curr1, curr2, inputVal) {
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((data) => {
      result.value = Object.values(data.rates)[0];
    })
    .catch(err => {
      alert("Error converting currency");
      console.error(err);
    });
}
