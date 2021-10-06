customElements.define('randomizer-form', class Randomizer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        return this.render()
    }

    render() {
        this.innerHTML = '';
        this.form = Object.assign(document.createElement('form'))
        this.number = Object.assign(document.createElement('input'), {
            placeholder: 'Максимальное число',
            minLength: 1,
            required: 'true'
        })
        this.submit = Object.assign(document.createElement('button'), {innerText: 'Генерировать', type: 'submit'})
        this.outputWrapper = Object.assign(document.createElement('div'), {id: 'results'});
        this.output = Object.assign(document.createElement('output'));
        ['change', 'keyup', 'keydown', 'blur'].forEach(event =>
            this.number.addEventListener(event, this.updateWidth))
        // this.number.addEventListener('change', this.updateWidth);
        // this.number.addEventListener('keyup', this.updateWidth);
        // this.number.addEventListener('keydown', this.updateWidth);
        // this.number.addEventListener('blur', this.updateWidth);
        this.form.addEventListener('submit', this.getNumber.bind(this))
        this.outputWrapper.appendChild(this.output);
        this.form.append(this.number, this.submit, this.outputWrapper);
        return this.appendChild(this.form);
    }

    getNumber(e) {
        e.preventDefault();
        return this.output.appendChild(Object.assign(document.createElement('span'),
            {innerText: this.getRandomIntInclusive(0, parseInt(this.number.value))}))
    }

    updateWidth(e) {
        if (!this.value) return this.style.width = 'auto';
        this.style.width = 0;
        this.style.width = (this.scrollWidth + 20) + 'px';
    }

    getRandomIntInclusive(min, max) {
        const randomBuffer = new Uint32Array(1);

        window.crypto.getRandomValues(randomBuffer);

        let randomNumber = randomBuffer[0] / (0xffffffff + 1);

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(randomNumber * (max - min + 1)) + min;
    }
})
