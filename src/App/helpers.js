console.warnOnce = (() => {
  let warned = {};

  return (str) => {
    if (!warned[str])
    console.warn(str);
    warned[str] = true;
  };
})();

console.todo = (text) => console.log(`TODO: %c${text}`, 'color: blue');

/* Just copy pasted from internet, ignore it */
export const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
