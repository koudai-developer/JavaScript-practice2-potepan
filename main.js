const buttons = document.querySelectorAll('button');
const result = document.getElementById('result');

buttons.forEach(button => button.addEventListener('click', buttonPressed));

let textMemory = "0";

// ボタンが押された時の処理
function buttonPressed(event) {
  const getText = event.target.textContent;
  const lastPressed = textMemory.slice(-1);
  const lastNumber = textMemory.split(/[\+\-\*\/]/).pop();

  if (operatorsControl(lastPressed, getText)) return;
  if (decimalControl(lastNumber, getText)) return;

  if (getText === "=") {
    textMemory = totalControl(textMemory);
  } else if (getText === "AC") {
    textMemory = "0";
  } else {
    if (textMemory === "0" && getText !== ".") {
      textMemory = getText;
    } else {
      textMemory += getText;
    };
    textMemory = sanitizeZeros(textMemory);
  };

  result.textContent = textMemory;

};

// 四則演算子と小数点の連続入力を防ぐ関数
function operatorsControl(lastPressed, getText) {
  const operators = ["+", "-", "*", "/", "."];
  return operators.includes(lastPressed) && operators.includes(getText);
};

// 小数点の重複を防ぐ関数
function decimalControl(lastNumber, getText) {
  return lastNumber.includes(".") && getText.includes(".");
};

// evalで合計を出す関数
function totalControl(textMemory) {
  return eval(textMemory).toString();
};

// 先頭にゼロを複数つけさせない関数
function sanitizeZeros(textMemory) {
  return textMemory.replace(/\b0+(?=\d)/g, "");
};