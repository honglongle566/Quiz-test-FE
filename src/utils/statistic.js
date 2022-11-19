export const formatTime = (dateTime) => {
  const date = dateTime.slice(0, 10).split('-').reverse().join('/');
  const time = dateTime.slice(11, 19);
  return time + ' ' + date;
};

function arrayToQueryString(key, arr) {
  const res = arr.map((item) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(item);
  });
  return res;
}
export function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (Array.isArray(obj[p])) {
        const res = arrayToQueryString(p, obj[p]);
        str.push(res.join('&'));
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
  return '?' + str.join('&');
}
export function timeStringToNumber(time) {
  const times = time.split(":");
  return Number(times[2]) + Number(times[1]) * 60 + Number(times[0]) * 3600;
}

