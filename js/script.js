// 1. DOM SELECTION (Mengambil elemen HTML yang dibutuhkan)
const modal = document.querySelector("#booking-modal");          
const btnSewaList = document.querySelectorAll(".btn-card-sewa"); 
const btnClose = document.querySelector("#close-modal");        
const inputKamera = document.querySelector("#camera-name");      
const inputTglMulai = document.querySelector("#start-date");     
const inputTglSelesai = document.querySelector("#end-date");     
const teksDurasi = document.querySelector("#booking-days");    
const teksTotal = document.querySelector("#total-price");        
const teksDp = document.querySelector("#dp-price");              

// 2. BATASAN TANGGAL MINIMUM (Mencegah memilih tanggal di masa lalu)
const hariIni = new Date().toISOString().split("T")[0];
inputTglMulai.min = hariIni;
inputTglSelesai.min = hariIni;

// Variabel penampung harga sewa harian (berubah sesuai kamera yang diklik)
let hargaPerHari = 0;

// 3. EVENT LISTENER: Buka modal saat tombol kartu kamera diklik
btnSewaList.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    // Ambil data dari atribut HTML: data-camera & data-price
    inputKamera.value = tombol.dataset.camera;
    hargaPerHari = parseInt(tombol.dataset.price);

    // Hitung ulang jika tanggal sudah pernah dipilih sebelumnya
    hitungBiaya();

    // Menampilkan modal dialog
    modal.showModal();
  });
});

// 4. EVENT LISTENER: Tutup modal saat tombol silang (✕) diklik
btnClose.addEventListener("click", () => {
  modal.close();
});

// 5. EVENT LISTENER: Saat tanggal mulai diubah
inputTglMulai.addEventListener("change", () => {
  // Tanggal selesai minimal sama dengan tanggal mulai
  inputTglSelesai.min = inputTglMulai.value;
  hitungBiaya();
});

// 6. EVENT LISTENER: Saat tanggal selesai diubah
inputTglSelesai.addEventListener("change", () => {
  hitungBiaya();
});

// 7. Kalkulasi durasi sewa, total biaya, dan estimasi DP
function hitungBiaya() {
  // Jangan hitung jika salah satu tanggal masih kosong
  if (!inputTglMulai.value || !inputTglSelesai.value) {
    return;
  }

  // Ubah teks tanggal menjadi objek Date agar bisa dihitung
  const tglMulai = new Date(inputTglMulai.value);
  const tglSelesai = new Date(inputTglSelesai.value);

  // Konversi selisih waktu dari milidetik ke hari (1 hari = 86.400.000 ms)
  const hariMs = 1000 * 60 * 60 * 24;
  const selisihHari = (tglSelesai - tglMulai) / hariMs;

  // Jika sewa di hari yang sama (selisih 0), dihitung minimal 1 hari
  const durasiSewa = selisihHari <= 0 ? 1 : selisihHari;

  // Perhitungan biaya
  const totalHarga = durasiSewa * hargaPerHari;
  const deposit = totalHarga * 0.4; // Estimasi DP 40%

  // Update teks pada tampilan modal (dengan format mata uang Rupiah)
  teksDurasi.textContent = durasiSewa + " Hari";
  teksTotal.textContent = "Rp " + totalHarga.toLocaleString("id-ID");
  teksDp.textContent = "Rp " + deposit.toLocaleString("id-ID");
}
