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
