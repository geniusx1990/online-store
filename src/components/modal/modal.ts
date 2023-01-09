import './modal.css';

class Modal {
    private container: HTMLDivElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'module-layer';
    }

    draw() {
        const formContainer = document.createElement('form');
        formContainer.className = 'form';
        this.container.append(formContainer);

        const detailsTitle = document.createElement('h3');
        detailsTitle.className = 'form__title';
        detailsTitle.textContent = 'Personal details';
        formContainer.append(detailsTitle);

        const nameInput = document.createElement('input');
        nameInput.className = 'form__name';
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter Your name & surname';
        // nameInput.pattern = '/[a-zA-Z]\b[a-zA-Z]/'; // под вопросом
        nameInput.required = true;
        formContainer.append(nameInput);

        nameInput.addEventListener('change', (e) => {
            const target = <HTMLInputElement>e.target;
            const numbers = '01234567890¬`!"£$%^&*()_+[]{}@:,./\\|<>#';
            const valueItems = target.value.split(' ');
            valueItems.forEach((item) => {
                if(item.length < 3) {
                    
                }
            })
        })
        
        const phoneInput = document.createElement('input');
        phoneInput.className = 'form__phone';
        phoneInput.type = 'tel';
        phoneInput.placeholder = '+375 XXX XXX';
        const regPhone = '\+?[0-9\s\-\(\)]+';
        phoneInput.pattern = regPhone;
        phoneInput.required = true;
        formContainer.append(phoneInput);
        
        const addressInput = document.createElement('input');
        addressInput.className = 'form__address';
        addressInput.type = 'text';
        addressInput.placeholder = 'Delivery address';
        addressInput.required = true;
        formContainer.append(addressInput);
        
        const emailInput = document.createElement('input');
        emailInput.className = 'form__email';
        emailInput.type = 'email';
        emailInput.placeholder = 'E-mail: ex. john2022@yahoo.com';
        emailInput.required = true;
        formContainer.append(emailInput);

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'form__card-title';
        cardTitle.textContent = 'Credit card details';
        formContainer.append(cardTitle);

        const cardInfo = document.createElement('div');
        cardInfo.className = 'form__card-info card-info';
        formContainer.append(cardInfo);

        const labelNumber = document.createElement('label');
        labelNumber.htmlFor = 'card-number';
        labelNumber.textContent = 'Card\'s number:';
        cardInfo.append(labelNumber);

        const cardNumberInput = document.createElement('input');
        cardNumberInput.id = 'card-number';
        cardNumberInput.type = 'number';
        cardNumberInput.pattern = '[0-9]{16}';
        cardNumberInput.required = true;
        cardInfo.append(cardNumberInput);

        const cardsAdd = document.createElement('div');
        cardsAdd.className = 'card-info__add';
        cardInfo.append(cardsAdd);

        const labelValid = document.createElement('label');
        labelValid.htmlFor = 'valid';
        labelValid.textContent = 'Valid:';
        cardsAdd.append(labelValid);

        const cardValidInput = document.createElement('input');
        cardValidInput.id = 'valid';
        cardValidInput.type = 'number';
        cardValidInput.pattern = '(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])'; // возможно
        cardValidInput.required = true;
        cardsAdd.append(cardValidInput);

        const labelCvv = document.createElement('label');
        labelCvv.htmlFor = 'cvv';
        labelCvv.textContent = 'CVV:';
        cardsAdd.append(labelCvv);

        const cardCvvInput = document.createElement('input');
        cardCvvInput.id = 'cvv';
        cardCvvInput.type = 'number';
        cardCvvInput.pattern = '[0-9]{3}';
        cardCvvInput.required = true;
        cardsAdd.append(cardCvvInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'form__button button_submit';
        submitButton.textContent = 'Submit';
        formContainer.append(submitButton);

        window.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if(target.classList.contains('module-layer')) {
                this.container.style.display = 'none';
            }
        })

        document.body.prepend(this.container);
    }
}

export default Modal;