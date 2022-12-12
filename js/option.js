class Option {
  constructor({ text }) {
    this.text = text;
  }

  get div() {
    let div = document.createElement('div');
    div.className = 'option';
    div.innerHTML = this.text;
    return div;
  }
}
