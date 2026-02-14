
const selectPaymentBtn = document.getElementById("selectPaymentBtn");
const back = document.getElementById("btn-back");
selectPaymentBtn.addEventListener("click", function () {
  window.location.href = "Checkout.html";
});

back.addEventListener("click", function () {
    window.location.href = "index.html";
});