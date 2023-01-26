const radioProgram = document.querySelectorAll('input[name="program"]');

for (const radio of radioProgram) {
  if (radio.checked) {
    console.log(radio);
  }
}

const maxPrice = 100000000;
const inputCost = document.querySelector("#input-cost");
const inputDownPayment = document.querySelector("#input-downpayment");
const inputTerm = document.querySelector("#input-term");
const form = document.querySelector("#form");
const totalCost = document.querySelector("#total-cost");
const totalMonthPayment = document.querySelector("#total-month-payment");
const cleavePriceSetting = {
  numeral: true,
  numeralThousandsGroupStyle: "thousand",
  delimiter: " ",
};
const cleavePriceSettingUAH = {
  numeral: true,
  numeralThousandsGroupStyle: "thousand",
  delimiter: " ",
  prefix: " ₴",
  tailPrefix: true,
};

const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);
calcMortgage();
form.addEventListener("input", function () {
  calcMortgage();
});

function calcMortgage() {
  const radioProgram = document.querySelectorAll('input[name="program"]');
  for (const radio of radioProgram) {
    if (radio.checked) {
      radio.closest(".radio-label").classList.add("active");
    } else {
      radio.closest(".radio-label").classList.remove("active");
    }
  }
  const totalAmount =
    cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
  totalCost.value = totalAmount;
  new Cleave(totalCost, cleavePriceSettingUAH);
  const creditRate = +document.querySelector('input[name="program"]:checked')
    .value;
  const monthRate = creditRate / 12;
  const years = +cleaveTerm.getRawValue();
  const months = years * 12;
  const monthPayment =
    (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - months));
  totalMonthPayment.innerText =
    new Intl.NumberFormat("ru").format(monthPayment.toFixed(2)) + " ₴";
}

const sliderCost = document.getElementById("slider");
noUiSlider.create(sliderCost, {
  start: 12000000,
  connect: "lower",
  step: 10000,
  range: {
    min: 0,
    "5%": [400000, 100000],
    "50%": [10000000, 1000000],
    max: 100000000,
  },
});
sliderCost.noUiSlider.on("slide", function () {
  const sliderValue = Math.round(sliderCost.noUiSlider.get(true));
  inputCost.value = sliderValue;
  cleaveCost.setRawValue(sliderValue);
  calcMortgage();
});

const sliderDownPayment = document.getElementById("slider-downpayment");
noUiSlider.create(sliderDownPayment, {
  start: 6000000,
  connect: "lower",
  range: {
    min: 0,
    "5%": [300000, 100000],
    "50%": [9000000, 1000000],
    max: 90000000,
  },
});
sliderDownPayment.noUiSlider.on("slide", function () {
  const sliderValue = Math.round(sliderDownPayment.noUiSlider.get(true));
  inputDownPayment.value = sliderValue;
  cleaveDownPayment.setRawValue(sliderValue);
  calcMortgage();
});

const sliderTerm = document.getElementById("slider-term");
noUiSlider.create(sliderTerm, {
  start: 10,
  connect: "lower",
  range: {
    min: 1,
    max: 30,
  },
});
sliderTerm.noUiSlider.on("slide", function () {
  const sliderValue = Math.round(sliderTerm.noUiSlider.get(true));
  inputTerm.value = sliderValue;
  cleaveTerm.setRawValue(sliderValue);
  calcMortgage();
});

inputCost.addEventListener("input", function () {
  const value = +cleaveCost.getRawValue();
  sliderCost.noUiSlider.set(value);
  if (value > maxPrice) {
    inputCost.closest(".param-details").classList.add("error");
  } else {
    inputCost.closest(".param-details").classList.remove("error");
  }
  const percentMin = value * 0.15;
  const percentMax = value * 0.9;

  sliderDownPayment.noUiSlider.updateOptions({
    range: {
      min: percentMin,
      max: percentMax,
    },
  });
});

inputCost.addEventListener("change", function () {
  const value = +cleaveCost.getRawValue();
  if (value > maxPrice) {
    inputCost.closest(".param-details").classList.remove("error");
    cleaveCost.setRawValue(maxPrice);
  }
});
