const calcForm = document.forms.calcForm;
const calcInput = calcForm.elements.calcInput;
const numberButtonList = Array.from(calcForm.querySelectorAll(".number"));
const symbolButtonList = Array.from(calcForm.querySelectorAll(".symbol"));

/*список символов*/
const listOfSymbols = [];
symbolButtonList.forEach((elem) => {
    listOfSymbols.push(elem.textContent);
});

/*словарь с мат. знаками и их приоритетом*/
const symbolDict = {
    "-": 0,
    "+": 0,
    "×": 1,
    "÷": 1
};

/*отменяем стандартное поведение браузера*/
calcForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
});

/*инпут становится красным*/
const inputError = () => {
    calcInput.style.backgroundColor = "#CC0000";
    // calcInput.style.width = "355px";
    // calcInput.style.height = "65px";

    setTimeout(() => {
        calcInput.style.backgroundColor = "#4a5741";
        // calcInput.style.width = "360px";
        // calcInput.style.height = "70px";
    }, 200);
};

const isNumeric = (string) => {
    return !isNaN(string);
};

/*функция, которая фиксит возможность ввода множества нулей подряд*/
const isPossibleToPrintZero = (string) => {
    if (string.length > 0) {
        if (string[0] == 0) {
            return false;
        }
        for (let i = string.length - 1; i > 0; i--) {
            if (listOfSymbols.includes(string[i - 1]) && string[i] == 0) {
                return false;
            } else {
                return true;
            }
        }
    }
    return true;
};

/*функция вывода значений кнопок на экран*/
const printSymbol = (string, someButton) => {
    if (string.substring(string.length - 1) == "÷" && someButton == 0) { //если последний символ в инпуте - знак деления, то нельзя вводить ноль
        inputError();
    } else if (!isPossibleToPrintZero(string) && someButton == 0) {
        return string;
    } else {
        string += someButton;
    }
    return string;
};


/*функция проверки инпута на пустоту*/
const isInputEmpty = (string) => {
    if (string.length == 0) {
        return true;
    } else {
        return false;
    }
}

/*функция вывода математических символов*/
const printMathSymbol = (string, someButton) => {
    if (isInputEmpty(string) && someButton !== "-") { //если инпут пустой и кнопка != "-", то не выводим символы
        return string;
    } else if (isInputEmpty(string) && someButton == "-") {
        return printSymbol(string, someButton);
    } else if (listOfSymbols.includes(string.substring(string.length - 1)) || !isNumeric(string[string.length - 1])) { //если символ уже есть в инпуте,
        return string; //то сразу после него нельзя печатать мат. символ
    } else {
        return printSymbol(string, someButton);
    }
};

/*функция удаления одного символа из инпута*/
const deleteSymbol = (string) => {
    string = string.substring(0, string.length - 1);
    return string;
};

/*проверяем, есть ли минус в кач-ве первого символа*/
const isMinus = (string) => {
    if (string[0] == "-") {
        return true;
    } else {
        return false;
    }
};

/*функция получения математических символов из инпута*/
const getMathSymbols = (string) => {
    const mathSymbols = [];
    for (let i = 0; i < string.length; i++) {
        if (i == 0 && isMinus(string)) {
            continue;
        }
        if (listOfSymbols.includes(string[i])) {
            mathSymbols.push(string[i]);
        }
    }
    return mathSymbols;
};

/*функция получения чисел из инпута*/
const getNumbers = (string) => { //спорно, надо бы переделать, но пока хз как
    let numbers = [];
    let index = 0;
    for (let i = 0; i < string.length; i++) {
        if (listOfSymbols.includes(string[i])) {
            if (i == 0 && isMinus(string)) {
                continue;
            }
            numbers.push(string.substring(index, i));
            index = i + 1;
        }
    }
    numbers.push(string.substring(index));
    return numbers;
};

/*функция округления*/
const rounding = (string) => {
    string = String(string);
    if (string.substring(string.length - 1) == 0) {
        return rounding(string.substring(0, string.length - 1));
    } else if (string.substring(string.length - 1) == ".") {
        return string.substring(0, string.length - 1);
    } else {
        return string;
    }
};

/*считает промежуточный результат*/
const interimResult = (number1, number2, action) => {
    let interimRes;
    switch (action) {
        case "+":
            interimRes = Number(number1) + Number(number2);
            break;
        case "-":
            interimRes = Number(number1) - Number(number2);
            break;
        case "×":
            interimRes = Number(number1) * Number(number2);
            break;
        case "÷":
            interimRes = Number(number1) / Number(number2);
            break;
        default:
            break;
    }
    return interimRes;
}

/*тут происходят вычисления*/
const calculation = (string, numberList, symbolList, result = string) => {
    let res = 0;
    if (symbolList.length !== 0 && !symbolList.includes(string.substring(string.length - 1))) {
        if (symbolList.includes("×") || symbolList.includes("÷")) {
            symbolList.forEach((symbol) => {
                if (symbolDict[symbol] == 1) {
                    res = numberList[symbolList.indexOf(symbol)];
                    result = interimResult(res, numberList[symbolList.indexOf(symbol) + 1], symbol);
                    numberList.splice(symbolList.indexOf(symbol), 2, result);
                    symbolList.splice(symbolList.indexOf(symbol), 1);
                    result = calculation(string, numberList, symbolList, result);
                }
            })
        } else {
            symbolList.forEach((symbol) => {
                res = numberList[symbolList.indexOf(symbol)];
                result = interimResult(res, numberList[symbolList.indexOf(symbol) + 1], symbol);
                numberList.splice(symbolList.indexOf(symbol), 2, result);
                symbolList.splice(symbolList.indexOf(symbol), 1);
                result = calculation(string, numberList, symbolList, result);
            });
        }
    } else if (symbolList.includes(string.substring(string.length - 1))) {
        return result;
    } else {
        result = rounding(result.toFixed(4));
    }
    return result;
}

const setEventListeners = () => {
    numberButtonList.forEach((elem) => {
        elem.addEventListener("click", () => {
            calcInput.value = printSymbol(calcInput.value, elem.textContent);
        });
    })
    symbolButtonList.forEach((elem) => {
        if (elem.id !== "button-pointer" && elem.id !== "button-equal") {
            elem.addEventListener("click", () => {
                calcInput.value = printMathSymbol(calcInput.value, elem.textContent);
            });
        } else if (elem.id == "button-pointer") {
            elem.addEventListener("click", () => {
                calcInput.value = deleteSymbol(calcInput.value);
            });
        } else if (elem.id = "button-equal") {
            elem.addEventListener("click", () => {
                calcInput.value = calculation(calcInput.value, getNumbers(calcInput.value), getMathSymbols(calcInput.value));
            })
        }
    })
}

setEventListeners();