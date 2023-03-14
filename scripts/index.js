const calcForm = document.forms.calcForm;
const calcInput = calcForm.elements.calcInput;
const numberButtonList = Array.from(calcForm.querySelectorAll(".number"));
const symbolButtonList = Array.from(calcForm.querySelectorAll(".symbol"));


numberButtonList.forEach((elem) => {
    elem.addEventListener("click", () => {
        calcInput.value += elem.textContent;
    });
})


const deleteSymbol = (string) => {
    string = string.substring(0, string.length - 1);
    console.log(string);
    return string;
};


symbolButtonList.forEach((elem) => {
    if (elem.id !== "button-pointer" && elem.id !== "button-equal") {
        elem.addEventListener("click", () => {
            calcInput.value += elem.textContent;
        });
    } else if (elem.id == "button-pointer") {
        elem.addEventListener("click", () => {
            calcInput.value = deleteSymbol(calcInput.value);
        });
    }
})

calcForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
});
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