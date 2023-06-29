// dom selection
const inputText = document.getElementById("inputText");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const uppercaseWordCount = document.getElementById("uppercaseWordCount");
const lowercaseWordCount = document.getElementById("lowercaseWordCount");
const totalNumberCount = document.getElementById("totalNumberCount");
const letterCount = document.getElementById("letterCount");

/**
 * analize text
 * Function
 */
const wordCountFunc = (text) => {
  const words = text.split(/\s+/).filter((word) => word.trim() !== "").length;
  return words || 0;
};

/**
 * Sentence Count
 * Function
 */
const sentenceCountFunc = (text) => {
  const sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim() !== "").length;
  return sentences || 0;
};

/**
 * Count Uppercase Words
 * Function
 */
const countUpperCaseWordFunc = (text) => {
  const uppercaseWords = text.match(/[A-Z]/g) || [];
  return uppercaseWords.length || 0;
};

/**
 * Count Lowercase Words
 * Function
 */
const countLowerCaseWordFunc = (text) => {
  const lowercaseLetters = text.match(/[a-z]/g) || [];
  return lowercaseLetters.length || 0;
};

/**
 * Total number
 * function
 */
const countTotalNumbersFunc = (text) => {
  const numbers = text.match(/\d/g) || [];
  return numbers.length || 0;
};

/**
 * count letter
 * function
 */
const countLetterFunc = (text) => {
  const letters = text.match(/[A-Za-z]/g) || [];
  return letters.length || 0;
};

inputText.addEventListener("change", async (event) => {
  const selectedText = event.target.value;

  const message = {
    selectedText,
    wordCount: wordCountFunc(selectedText),
    sentenceCount: sentenceCountFunc(selectedText),
    uppercaseWordCount: countUpperCaseWordFunc(selectedText),
    lowercaseWordCount: countLowerCaseWordFunc(selectedText),
    totalNumberCount: countTotalNumbersFunc(selectedText),
    letterCount: countLetterFunc(selectedText),
  };
  chrome.runtime.sendMessage(message);
  await chrome.storage.sync.set({ message });

  wordCount.innerText = wordCountFunc(selectedText);
  sentenceCount.innerText = sentenceCountFunc(selectedText);
  uppercaseWordCount.innerText = countUpperCaseWordFunc(selectedText);
  lowercaseWordCount.innerText = countLowerCaseWordFunc(selectedText);
  totalNumberCount.innerText = countTotalNumbersFunc(selectedText);
  letterCount.innerText = countLetterFunc(selectedText);
});

chrome.storage.sync.get("message").then(({ message }) => {
  inputText.value = message.selectedText;
  wordCount.innerText = message.wordCount;
  sentenceCount.innerText = message.sentenceCount;
  uppercaseWordCount.innerText = message.uppercaseWordCount;
  lowercaseWordCount.innerText = message.lowercaseWordCount;
  totalNumberCount.innerText = message.totalNumberCount;
  letterCount.innerText = message.letterCount;
});
