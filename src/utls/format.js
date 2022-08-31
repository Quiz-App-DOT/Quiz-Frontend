function decodeEntity(inputStr) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
}
  
export const formatQuestion = (q) => decodeEntity(q);
export const formatAnswer = (a) => decodeEntity(a);