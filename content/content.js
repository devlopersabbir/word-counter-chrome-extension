/**
 * analize text
 * Function
 */
const wordCount = (text) => {
  const words = text.split(/\s+/).filter((word) => word.trim() !== "").length;
  return words || 0;
};

/**
 * Sentence Count
 * Function
 */
const sentenceCount = (text) => {
  const sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim() !== "").length;
  return sentences || 0;
};

/**
 * Count Uppercase Words
 * Function
 */
const countUpperCaseWord = (text) => {
  const uppercaseWords = text.match(/[A-Z]/g) || [];
  return uppercaseWords.length || 0;
};

/**
 * Count Lowercase Words
 * Function
 */
const countLowerCaseWord = (text) => {
  const lowercaseLetters = text.match(/[a-z]/g) || [];
  return lowercaseLetters.length || 0;
};

/**
 * Total number
 * function
 */
const countTotalNumbers = (text) => {
  const numbers = text.match(/\d/g) || [];
  return numbers.length || 0;
};

/**
 * count letter
 * function
 */
const countLetter = (text) => {
  const letters = text.match(/[A-Za-z]/g) || [];
  return letters.length || 0;
};

/**
 * Get Selected Text
 * Function
 */
const getSelectedText = () => {
  const selectedText = window.getSelection().toString().trim();
  return selectedText;
};

/**
 * Send message to the popup
 * Function
 */
const sendMessageToExtension = async (selectedText) => {
  const message = {
    selectedText,
    wordCount: wordCount(selectedText),
    sentenceCount: sentenceCount(selectedText),
    uppercaseWordCount: countUpperCaseWord(selectedText),
    lowercaseWordCount: countLowerCaseWord(selectedText),
    totalNumberCount: countTotalNumbers(selectedText),
    letterCount: countLetter(selectedText),
  };

  await chrome.runtime.sendMessage(message);
  await chrome.storage.sync.set({ message });
};

/**
 * When any text select then fire this function
 * Function
 */
document.addEventListener("mouseup", () => {
  const selectedText = getSelectedText();
  if (selectedText) {
    sendMessageToExtension(selectedText);
  }
});
