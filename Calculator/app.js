class Equation {
  constructor() {
    this.num1 = {
      str: "0",
      positive: true,
    };
    this.num2 = {
      str: "",
      positive: true,
    };
    this.operator = "";
  }
  clearAll() {
    this.num1 = { str: "0", positive: true };
    this.num2 = { str: "", positive: true };
    this.operator = "";
  }

  addSign(num) {
    if (num.positive) {
      return num.str;
    } else {
      return `-${num.str}`;
    }
  }
  toggleSign() {
    if (this.haveOperator()) {
      this.num2.positive = !this.num2.positive;
    } else {
      this.num1.positive = !this.num1.positive;
    }
  }
  getNum1() {
    return this.addSign(this.num1);
  }
  getNum2() {
    return this.addSign(this.num2);
  }
  addNumber(newNum) {
    // if we have an operator, work on num2
    if (eq.haveOperator()) {
      eq.num2.str += newNum;
    } else {
      // no operator yet
      // remove leading zero if it exists
      if (eq.num1.str === "0") {
        eq.num1.str = newNum;
      } else {
        eq.num1.str += newNum;
      }
    }
  }
  clearElement() {
    if (!this.haveOperator()) {
      // if no operator yet, deal with num1
      // remove last number in str
      // add zero if str is left empty

      this.num1.str = this.num1.str.slice(0, -1);

      if (this.num1.str.length === 0) {
        this.num1.str = "0";
        this.num1.positive = true;
      }
    } else if (!this.haveNum2()) {
      // if we have an operator but no num2
      // remove operator
      this.operator = "";
    } else {
      // we have operator and num2
      // deal with num2
      this.num2.str = this.num2.str.slice(0, -1);
      if (this.num2.str.length === 0) {
        this.num2.positive = true;
      }
    }
  }
  haveOperator() {
    return this.operator != "";
  }
  haveNum2() {
    return this.num2.str != "";
  }
  calculate() {
    let x = parseFloat(this.num1.str);
    x = this.num1.positive ? x : x * -1;

    let y = parseFloat(this.num2.str);
    y = this.num2.positive ? y : y * -1;
    let ans;

    switch (this.operator) {
      case "+":
        ans = x + y;
        break;
      case "-":
        ans = x - y;
        break;
      case "x":
        ans = x * y;
        break;
      case '÷':
        ans = x / y;
        break;
      default:
        ans = "";
    }
    this.num1.str = Math.abs(ans).toString();
    this.num1.positive = (ans >= 0) ? true : false;
    this.operator = "";
    this.num2.str = "";
    this.num2.positive = true;

  }
}
// create the equation variable
const eq = new Equation();
const operatorArray = ["x", "&#247", "-", "+"];
// DOM elements
const answerDiv = document.querySelector(".answer");
const numBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const clearElementBtn = document.querySelector(".clear-element");
const signBtn = document.querySelector(".sign");
const equalBtn = document.querySelector(".equal");
const decimalBtn = document.querySelector('.decimal');

// Event Handlers
numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    eq.addNumber(btn.innerHTML);
    answerDiv.children[0].innerHTML = eq.getNum1();

    answerDiv.children[2].innerHTML = eq.getNum2();
  });
});
decimalBtn.addEventListener('click', () => {
  if (eq.haveOperator()) {
    // check num2 for decimal
    // if no decimal is found, go ahead and add it
    // otherwise ignore it for now
    if (eq.getNum2().indexOf('.') === -1) {
      eq.addNumber(decimalBtn.innerHTML);
      answerDiv.children[2].innerHTML = eq.getNum2();

    }
  } else {
    // check num1 for decimal
    if (eq.getNum1().indexOf('.') === -1) {
      eq.addNumber(decimalBtn.innerHTML);
      answerDiv.children[0].innerHTML = eq.getNum1();

    }
  }
})
function toggleOperators() {
  if (eq.haveOperator()) {
    operatorBtns.forEach((btn) => {
      btn.classList.add('disable');
    })
  } else {
    operatorBtns.forEach((btn) => {
      btn.classList.remove('disable');
    })
  }
}
function enableOperators() {
  operatorBtns.forEach((btn) => {
    btn.classList.remove('disable');
  })
}
operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    eq.operator = btn.innerHTML;
    answerDiv.children[1].innerHTML = eq.operator;
    toggleOperators();
  });
});

clearBtn.addEventListener("click", () => {
  eq.clearAll();
  answerDiv.children[0].innerHTML = eq.getNum1();
  answerDiv.children[1].innerHTML = eq.operator;
  toggleOperators();
  answerDiv.children[2].innerHTML = eq.getNum2();
});

clearElementBtn.addEventListener("click", () => {
  eq.clearElement();
  answerDiv.children[0].innerHTML = eq.getNum1();
  answerDiv.children[1].innerHTML = eq.operator;
  toggleOperators();
  answerDiv.children[2].innerHTML = eq.getNum2();
});

signBtn.addEventListener("click", () => {
  eq.toggleSign();
  answerDiv.children[0].innerHTML = eq.getNum1();
  answerDiv.children[2].innerHTML = eq.getNum2();
});

equalBtn.addEventListener("click", () => {
  eq.calculate();
  answerDiv.children[0].innerHTML = eq.getNum1();
  answerDiv.children[1].innerHTML = eq.operator;
  toggleOperators();
  answerDiv.children[2].innerHTML = eq.getNum2();
});

