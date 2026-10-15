// Ambil elemen dari HTML
const modal = document.querySelector("#booking-modal"); // Elemen dialog
const btnSewaList = document.querySelectorAll(".btn-card-sewa"); // Semua tombol "Sewa Sekarang"
const btnClose = document.querySelector("#close-modal");
const inputKamera = document.querySelector("#camera-name");
const inputTglMulai = document.querySelector("#start-date");
const inputTglSelesai = document.querySelector("#end-date");

const hariIni = new Date().toISOString().split("T")[0];
inputTglMulai.min = hariIni;
inputTglSelesai.min = hariIni;

// Pasang event click ke setiap tombol sewa untuk membuka modal
btnSewaList.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    inputKamera.value = tombol.dataset.camera;
    modal.showModal(); // Buka modal
  });
});

btnClose.addEventListener("click", () => {
  modal.close();
});

inputTglMulai.addEventListener("change", () => {
  inputTglSelesai.min = inputTglMulai.value;
});
