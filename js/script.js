const modal = document.querySelector("#booking-modal");
const btnClose = document.querySelector("#close-modal");
const btnSewaList = document.querySelectorAll(".btn-card-sewa");
const inputKamera = document.querySelector("#camera-name");
let hargaPerHari = 0;
const inputTglMulai = document.querySelector("#start-date");
const inputTglSelesai = document.querySelector("#end-date");

const hariIni = new Date().toISOString().split("T")[0];
inputTglMulai.min = hariIni;
inputTglSelesai.min = hariIni;

btnSewaList.forEach((btn) => {
  btn.addEventListener("click", () => {
    const namaKamera = btn.dataset.camera;
    hargaPerHari = parseInt(btn.dataset.price);
    inputKamera.value = namaKamera;
    modal.showModal();
  });
});

btnClose.addEventListener("click", () => {
  modal.close();
});

inputTglMulai.addEventListener("change", () => {
  inputTglSelesai.min = inputTglMulai.value;
})