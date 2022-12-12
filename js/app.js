class App {
  constructor() {
    this.selectedAlphabet = null;
    this.wrongAnswerEmoji = ['🤬', '🥶', '😡', '🤡', '💩', '🤢', '💀', '👽', '🔒'];
    this.correctAnswerEmoji = ['😀', '😁', '🥳', '🤩', '😊', '🤗', '😎', '😍', '😸', '🍣', '㊗️'];
    this.alphabets = document.querySelectorAll('input[name="alphabet"]');
    this.jpDiv = document.querySelector('#jp');
    this.startDiv = document.querySelector('#start');
    this.startButton = document.querySelector('#start #button');
    this.contentDiv = document.querySelector('#content');
    this.optionsDiv = document.querySelector('#options');
    this.noteDiv = document.querySelector('#note');
    this.scoreDiv = document.querySelector('#score');
    this.selectedAlphabetDiv = document.querySelector('#selected_alphabet');
    this.score = 0;

    this.#init();
  }

  get randomWrongEmoji() {
    return this.#getRandomElement(this.wrongAnswerEmoji);
  }

  get randomCorrectEmoji() {
    return this.#getRandomElement(this.correctAnswerEmoji);
  }

  get currentAlphabet() {
    return ALPHABETS[this.selectedAlphabet];
  }

  correctAnswer() {
    this.noteDiv.innerHTML = this.randomCorrectEmoji;
    this.score++;

    this.scoreDiv.innerText = `🔥 ${this.score}`

    setTimeout(function () {
      this.prompt();
    }.bind(this), INTERVAL)
  }

  incorrectAnswer() {
    this.noteDiv.innerHTML = this.randomWrongEmoji;
    this.score = 0;
    this.scoreDiv.innerText = '';
  }

  prompt() {
    this.#clear();

    let keys = Object.keys(this.currentAlphabet);
    this.character = this.#getRandomElement(keys);
    this.jpDiv.innerHTML = this.character;
    this.answer = this.currentAlphabet[this.character];

    let options = this.#shuffle(this.#buildOptions(this.answer));

    for (let i = 0; i < options.length; i++) {
      let o = options[i];
      this.optionsDiv.appendChild(o);
      o.addEventListener('click', function (e) {
        if (this.answer === e.target.innerHTML) {
          this.correctAnswer();
        } else {
          this.incorrectAnswer();
        }
      }.bind(this));
    }
  }

  #init() {
    this.startButton.addEventListener('click', function (_e) {
      for (let i = 0; i < this.alphabets.length; i++) {
        if (this.alphabets[i].checked) {
          this.selectedAlphabet = this.alphabets[i].value;
          this.selectedAlphabetDiv.innerText = this.selectedAlphabet;
        }
      }

      this.startDiv.style.display = 'none';
      this.contentDiv.style.display = 'block';
      this.prompt();
    }.bind(this));
  }

  #getRandomElement(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  #fetchCharacter(array) {
    let char = this.#getRandomElement(Object.values(this.currentAlphabet));
    if (array.includes(char)) {
      return this.#fetchCharacter(array)
    } else {
      return char;
    }
  }

  #buildOptions(answer) {
    let answers = [answer];
    for (let i = 0; i < 3; i++) {
      let char = this.#fetchCharacter(answers);
      answers.push(char);
    }

    let options = answers.map(a => new Option({ text: a }).div);

    return options;
  }

  // https://stackoverflow.com/a/2450976/20299436
  #shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  #clear() {
    this.optionsDiv.innerHTML = '';
    this.noteDiv.innerHTML = '';
  }
}
