export function getTimeNow() {
  const d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  return `${hr}:${min} ${ampm}`;
}
