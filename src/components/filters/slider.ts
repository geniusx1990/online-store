const priceSliderOne = <HTMLInputElement>document.querySelector('.price-input_first');
const priceSliderTwo = <HTMLInputElement>document.querySelector('.price-input_second');
const priceValueOne = <HTMLSpanElement>document.querySelector('.price-slider__value-one');
const priceValueTwo = <HTMLSpanElement>document.querySelector('.price-slider__value-two');
const priceSliderTrack = <HTMLDivElement>document.querySelector('.price-slider__track');
const priceMaxValue = priceSliderOne.max;
let minGap = 5;

priceSliderOne?.addEventListener('input', () => {
    slidePricesOne(priceSliderOne, priceSliderTwo, minGap, priceValueOne, priceMaxValue, priceSliderTrack);
});
priceSliderTwo?.addEventListener('input', () => {
    slidePricesTwo(priceSliderOne, priceSliderTwo, minGap, priceValueTwo, priceMaxValue, priceSliderTrack);
});

const stockSliderOne = <HTMLInputElement>document.querySelector('.stock-input_first');
const stockSliderTwo = <HTMLInputElement>document.querySelector('.stock-input_second');
const stockValueOne = <HTMLSpanElement>document.querySelector('.stock-slider__value-one');
const stockValueTwo = <HTMLSpanElement>document.querySelector('.stock-slider__value-two');
const stockSliderTrack = <HTMLDivElement>document.querySelector('.stock-slider__track');
const stockMaxValue = stockSliderOne.max;

stockSliderOne?.addEventListener('input', () => {
    slidePricesOne(stockSliderOne, stockSliderTwo, minGap, stockValueOne, stockMaxValue, stockSliderTrack);
});
stockSliderTwo?.addEventListener('input', () => {
    slidePricesTwo(stockSliderOne, stockSliderTwo, minGap, stockValueTwo, stockMaxValue, stockSliderTrack);
});

function slidePricesOne(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueOne: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
    if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
        sliderOne.value = (parseInt(sliderTwo.value) - gap).toString();
    }
    valueOne.textContent = sliderOne.value;
    fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
}

function slidePricesTwo(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueTwo: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
    if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
        sliderTwo.value = (parseInt(sliderOne.value) + gap).toString();
    }
    valueTwo.textContent = sliderTwo.value;
    fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
}

function fillWithColor(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, maxValue: string, sliderTrack: HTMLDivElement) {
    let percentOne = (parseInt(sliderOne.value) / parseInt(maxValue)) * 100;
    let percentTwo = (parseInt(sliderTwo.value) / parseInt(maxValue)) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #efefef ${percentOne}%, #333e48 ${percentOne}%, #333e48 ${percentTwo}%, #efefef ${percentTwo}%)`;
}

