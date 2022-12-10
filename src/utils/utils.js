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

export function timeStringToNumber(time) {
  const times = time.split(':');
  return Number(times[2]) + Number(times[1]) * 60 + Number(times[0]) * 3600;
}
