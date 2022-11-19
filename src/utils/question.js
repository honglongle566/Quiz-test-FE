export const sortAnswers = (a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
};

export const getLetter = (num) => {
  var letter = String.fromCharCode(num + 97);
  return letter;
};

export const getRandomInt = (max, min) => {
  return Math.floor(Math.random() * max) + min;
}