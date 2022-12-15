export function renderExtra(array) {
  const string = [];
  for (const index in array) {
    if (array[index].status) {
      string.push(array[index].name);
    }
  }
  return string;
}

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
};

export const formatTime = (dateTime) => {
  const date = dateTime.slice(0, 10).split('-').reverse().join('/');
  const time = dateTime.slice(11, 19);
  return time + ' ' + date;
};
export const formatDate = (date) => {
  return date.slice(0, 10).split('-').reverse().join('/');
};

export const timeStringToNumber = (time) => {
  const times = time.split(':');
  return Number(times[2]) + Number(times[1]) * 60 + Number(times[0]) * 3600;
};

export const convertToPlain = (html) => {
  var tempDivElement = document.createElement('div');
  tempDivElement.innerHTML = html;
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

export const checkQuestionDone = (question, listAnswers) => {
  if (
    (question.type === 1 || question.type === 2) &&
    listAnswers[question.index]?.length > 0
  ) {
    return true;
  } else if (question.type === 3 && listAnswers[question.index]) {
    if (Object.keys(listAnswers[question.index])?.length) {
      return true;
    }
  } else if (question.type === 4 && listAnswers[question.index]) {
    for (let item of listAnswers[question.index]) {
      if (!item.content) return false;
    }
    return true;
  }
  return false;
};
