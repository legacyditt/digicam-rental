const modal = document.querySelector("#booking-modal");
const btnClose = document.querySelector("#close-modal");
const btnSewaList = document.querySelectorAll(".btn-card-sewa");

btnSewaList.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.showModal();
  });
});

btnClose.addEventListener("click", () => {
  modal.close();
});
