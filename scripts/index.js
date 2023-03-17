const calcForm = document.forms.calcForm;
const calcInput = calcForm.elements.calcInput;
const numberButtonList = Array.from(calcForm.querySelectorAll(".number"));
const symbolButtonList = Array.from(calcForm.querySelectorAll(".symbol"));

const symbolList = []
symbolButtonList.forEach((elem) => {
    symbolList.push(elem.textContent);
});


/*функция вывода значений кнопок на экран*/
const printSymbol = (string, someButton) => {
    string += someButton;
    console.log(someButton);
    return string;
};

/*функция вывода математических символов*/
const printMathSymbol = (string, someButton) => {
    if (isInputEmpty(string)) {
        return string;
    } else if (symbolList.includes(string.substring(string.length - 1))) {
        console.log(string[string.length - 1]);
        return string;
    } else {
        return printSymbol(string, someButton);
    }
};

/*функция проверки инпута на предмет пустоты?*/
const isInputEmpty = (string) => {
    if (string.length == 0) {
        console.log("empty");
        return true;
    } else {
        console.log("not empty");
        return false;
    }
}

/*функция удаления одного символа из инпута*/
const deleteSymbol = (string) => {
    string = string.substring(0, string.length - 1);
    console.log(string);
    return string;
};



/*функция получения математических символов из инпута*/
const getMathSymbols = (string) => {
    let mathSymbols = [];
    for (let i = 0; i < string.length; i++) {
        if (symbolList.includes(string[i])) {
            mathSymbols.push(string[i]);
        }
    }

    console.log("getMathSymbols", mathSymbols);
    return mathSymbols;
};


/*функция получения чисел из инпута*/
const getNumbers = (string) => {
    let numbers = [];
    for (let i = 0; i < string.length; i++) {
        if (symbolList.includes(string[i])) {
            numbers.push(string.substring(0, i));
            numbers.push(string.substring(i + 1, string.length));
        }
    }
    console.log(numbers);
    return numbers;
};


/*функция, в которой происходят вычисления*/
const calculation = (string, numberList, symbolList) => {
    if (symbolList.length !== 0) {
        switch (symbolList[0]) {
            case "+":
                string = Number(numberList[0]) + Number(numberList[1]);
                break;
            case "-":
                string = numberList[0] - numberList[1];
                break;
            case "×":
                string = (numberList[0] * numberList[1]).toFixed(4);
                break;
            case "÷":
                string = (numberList[0] / numberList[1]).toFixed(4);
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
        calcInput.value += elem.textContent;
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

const impossiblePrintSymbolsFirstly = (string, someButton) => {
    if (string.length == 0) {
        someButton.removeEventListener("click", () => {
            printSymbol(string, someButton);
        });
    } else {
        someButton.addEventListener("click", () => {
            printSymbol(string, someButton);
        })
    }
    return string;
}

calcForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
});

const setEventListeners = (formElem) => {

};
/*
const printSigns = (form) => {
    const buttonsList = Array.from(form.querySelectorAll(".calc__button"));
    buttonsList.forEach((buttonElement) => {
        buttonElement.addEventListener("click", () => {
            calcInput.value += buttonElement.textContent;
        });
    });

};

printSigns(calcForm);
*/