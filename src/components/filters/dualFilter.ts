class DualFilter {
    private container: HTMLElement;
    title: string;
    minValue: string;
    maxValue: string;

    constructor(title: string, minValue: string, maxValue: string) {
        this.container = document.createElement('div');
        this.container.className = `filters__${title}-slider-container`;
        this.title = title;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    slidePricesOne(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueOne: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
        if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
            sliderOne.value = (parseInt(sliderTwo.value) - gap).toString();
        }
        valueOne.textContent = sliderOne.value;
        this.fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
    }

    slidePricesTwo(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, gap: number, valueTwo: HTMLSpanElement, maxValue: string, sliderTrack: HTMLDivElement) {
        if((parseInt(sliderTwo.value) - parseInt(sliderOne.value)) <= gap) {
            sliderTwo.value = (parseInt(sliderOne.value) + gap).toString();
        }
        valueTwo.textContent = sliderTwo.value;
        this.fillWithColor(sliderOne, sliderTwo, maxValue, sliderTrack);
    }

    fillWithColor(sliderOne: HTMLInputElement, sliderTwo: HTMLInputElement, maxValue: string, sliderTrack: HTMLDivElement) {
        let percentOne = (parseInt(sliderOne.value) / parseInt(maxValue)) * 100;
        let percentTwo = (parseInt(sliderTwo.value) / parseInt(maxValue)) * 100;
        sliderTrack.style.background = `linear-gradient(to right, #efefef ${percentOne}%, #333e48 ${percentOne}%, #333e48 ${percentTwo}%, #efefef ${percentTwo}%)`;
    }



    draw() {
        const sliderTitle = document.createElement('h3');
        sliderTitle.className = `${this.title}__title`;
        sliderTitle.textContent = this.title;
        this.container.append(sliderTitle);

        const values = document.createElement('div');
        values.className = `${this.title}-slider__values`;
        this.container.append(values);

        const valueOne = document.createElement('span');
        valueOne.className = `${this.title}-slider__value-one`;
        valueOne.textContent = `${this.minValue}`;
        values.append(valueOne);
        
        const dash = document.createElement('span');
        dash.textContent = ' - ';
        values.append(dash);

        const valueTwo = document.createElement('span');
        valueTwo.className = `${this.title}-slider__value-two`;
        valueTwo.textContent = ` ${this.maxValue}`;
        values.append(valueTwo);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = `filters__${this.title}-slider slider`;
        this.container.append(sliderWrapper);

        const track = document.createElement('div');
        track.className = `${this.title}-slider__track`;
        sliderWrapper.append(track);

        const firstInput = document.createElement('input');
        firstInput.type = 'range';
        firstInput.min = this.minValue;
        firstInput.max = this.maxValue;
        firstInput.value = this.minValue;
        firstInput.className = `${this.title}-slider__input ${this.title}-input_first`;
        sliderWrapper.append(firstInput);

        const secondInput = document.createElement('input');
        secondInput.type = 'range';
        secondInput.min = this.minValue;
        secondInput.max = this.maxValue;
        secondInput.value = this.maxValue;
        secondInput.className = `${this.title}-slider__input ${this.title}-input_second`;
        sliderWrapper.append(secondInput);

        firstInput.addEventListener('input', () => {
            this.slidePricesOne(firstInput, secondInput, 0, valueOne, this.maxValue, track);
        })

        secondInput.addEventListener('input', () => {
            this.slidePricesTwo(firstInput, secondInput, 0, valueTwo, this.maxValue, track);
        })


        return this.container;   
    }
}

export default DualFilter;