const currencyButton = document.getElementById("currency-button");
const currencyOptions = document.querySelectorAll(".dropdown-menu a");

currencyOptions.forEach((option) => {
  option.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedCurrency = this.getAttribute("data-currency");
    currencyButton.textContent = `${selectedCurrency}`;
  });
});
