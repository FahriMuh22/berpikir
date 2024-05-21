const words = ['monas', 'kasur', 'seblak', 'rumah', 'laptop', 'celana', 'lemari', 'ruang', 'lapangan', 'rambut'];
let randomWord, shuffledWord;
let attemptsLeft = 5;

const guessSubmit = document.getElementById('guessSubmit');
const guessField = document.getElementById('guessField');
const message = document.querySelector('.message');
const wordDisplay = document.querySelector('.word');
const attemptsDisplay = document.getElementById('attempts');
const resetGame = document.getElementById('resetGame');
const hintDisplay = document.querySelector('.hint');

function initializeGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  shuffledWord = shuffleWord(randomWord);
  wordDisplay.textContent = shuffledWord;
  hintDisplay.textContent = `Petunjuk: Kata dimulai dengan '${randomWord.charAt(0)}' dan berakhir dengan '${randomWord.charAt(randomWord.length - 1)}'`;
  message.textContent = '';
  guessField.value = '';
  attemptsLeft = 5;
  attemptsDisplay.textContent = attemptsLeft;
  guessField.disabled = false;
  guessSubmit.disabled = false;
}

function shuffleWord(word) {
  let wordArr = word.split('');
  for (let i = wordArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]];
  }
  return wordArr.join('');
}

function checkGuess() {
  const userGuess = guessField.value.toLowerCase();
  if (userGuess === randomWord) {
    message.textContent = 'Selamat! Anda menebak kata dengan benar.';
    message.style.color = 'green';
    guessField.disabled = true;
    guessSubmit.disabled = true;
  } else {
    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;
    if (attemptsLeft <= 0) {
      message.textContent = `Maaf, Anda kehabisan percobaan. Kata yang benar adalah '${randomWord}'.`;
      message.style.color = 'red';
      guessField.disabled = true;
      guessSubmit.disabled = true;
    } else {
      message.textContent = 'Tebakan Anda salah. Coba lagi!';
      message.style.color = 'red';
    }
  }
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);
resetGame.addEventListener('click', initializeGame);

initializeGame();
