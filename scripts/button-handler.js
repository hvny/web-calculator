const infoButton = document.querySelector(".header__info-button");
const popup = document.querySelector(".popup");

const animation = () => {
    if (popup.classList.contains("popup_visible")) {
        popup.classList.toggle("popup_hidden");
        popup.classList.remove("popup_visible")
    }
    popup.classList.add("popup_visible");
};


infoButton.addEventListener("click", animation);