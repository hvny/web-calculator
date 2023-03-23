const calcForm = document.forms.calcForm;
const calcInput = calcForm.elements.calcInput;
const numberButtonList = Array.from(calcForm.querySelectorAll(".number"));
const symbolButtonList = Array.from(calcForm.querySelectorAll(".symbol"));

/*список математических символов*/
const listOfMathSymbols = [];
symbolButtonList.forEach((elem) => {
    listOfMathSymbols.push(elem.textContent);
});

/*отменяем стандартное поведение браузера*/
calcForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
});

const isNumeric = (string) => {
    return !isNaN(string);
};



/*функция вывода значений кнопок на экран*/
const printSymbol = (string, someButton) => {
    string += someButton;
    console.log(someButton);
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
    } else if (listOfMathSymbols.includes(string.substring(string.length - 1))) { //если символ уже есть в инпуте,
        return string; //то сразу после негоо нельзя печатать мат. символ
    } else {
        return printSymbol(string, someButton);
    }
};

/*функция удаления одного символа из инпута*/
const deleteSymbol = (string) => {
    string = string.substring(0, string.length - 1);
    console.log(string);
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
    let mathSymbols = [];
    for (let i = 0; i < string.length; i++) {
        if (i == 0 && isMinus(string)) {
            continue;
        }
        if (listOfMathSymbols.includes(string[i])) {
            mathSymbols.push(string[i]);
        }
    }
    console.log("mathSymbols", mathSymbols);
    return mathSymbols;
};

/*функция получения чисел из инпута*/
const getNumbers = (string) => { //спорно, надо бы переделать, но пока хз как
    let numbers = [];
    let index = 0;
    for (let i = 0; i < string.length; i++) {
        if (listOfMathSymbols.includes(string[i])) {
            if (i == 0 && isMinus(string)) {
                continue;
            }
            numbers.push(string.substring(index, i));
            index = i + 1;
        }
    }
    numbers.push(string.substring(index));

    console.log("numbers", numbers);
    return numbers;
};




const divide = (string, numberList, symbolList) => {
    string = numberList[0] / numberList[1];
};


/*функция округления*/
const rounding = (string) => {
    if (string.substring(string.length - 1) == 0) {
        return rounding(string.substring(0, string.length - 1));
    } else if (string.substring(string.length - 1) == ".") {
        return string.substring(0, string.length - 1);
    } else {
        return string;
    }
};

/*функция, в которой происходят вычисления*/
const calculation = (string, numberList, symbolList) => {
    if (symbolList.length !== 0 && !symbolList.includes(string.substring(string.length - 1))) {
        switch (symbolList[0]) {
            case "+":
                string = Number(numberList[0]) + Number(numberList[1]);
                break;
            case "-":
                string = numberList[0] - numberList[1];
                break;
            case "×":
                string = rounding((numberList[0] * numberList[1]).toFixed(4));
                break;
            case "÷":
                string = rounding((numberList[0] / numberList[1]).toFixed(4));
                break;
            default:
                string = string;
                break;
        }
    }
    return string;

};


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