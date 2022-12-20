
const priceSliderOne = <HTMLInputElement>document.querySelector('.price-input_first');
const priceSliderTwo = <HTMLInputElement>document.querySelector('.price-input_second');
const priceValueOne = <HTMLSpanElement>document.querySelector('.price-slider__value-one');
const priceValueTwo = <HTMLSpanElement>document.querySelector('.price-slider__value-two');
const priceSliderTrack = <HTMLDivElement>document.querySelector('.price-slider__track');
const priceMaxValue = priceSliderOne.max;
let minGap = 0;

priceSliderOne?.addEventListener('input', slidePricesOne);
priceSliderTwo?.addEventListener('input', slidePricesTwo);

function slidePricesOne() {
    if((parseInt(priceSliderTwo.value) - parseInt(priceSliderOne.value)) <= minGap) {
        priceSliderOne.value = (parseInt(priceSliderTwo.value) - minGap).toString();
    }
    priceValueOne.textContent = priceSliderOne.value;
    fillWithColor();
}

function slidePricesTwo() {
    if((parseInt(priceSliderTwo.value) - parseInt(priceSliderOne.value)) <= minGap) {
        priceSliderTwo.value = (parseInt(priceSliderOne.value) + minGap).toString();
    }
    priceValueTwo.textContent = priceSliderTwo.value;
    fillWithColor();
}

function fillWithColor() {
    let percentOne = (parseInt(priceSliderOne.value) / parseInt(priceMaxValue)) * 100;
    let percentTwo = (parseInt(priceSliderTwo.value) / parseInt(priceMaxValue)) * 100;
    priceSliderTrack.style.background = `linear-gradient(to right, #efefef ${percentOne}%, #333e48 ${percentOne}%, #333e48 ${percentTwo}%, #efefef ${percentTwo}%)`;
}
