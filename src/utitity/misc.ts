export function decodeHTMLEntities(str: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}