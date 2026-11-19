const STORAGE_KEY = "kopi-nusa-preferensi-kontak";

function simpanPreferensi() {
  const data = new FormData(form);
  const preferensi = {
    paket: data.get("paket"),
    topik: data.get("topik"),
    updatedAt: new Date().toISOString(),
  };

  console.log("Menyimpan preferensi:", preferensi);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
}

function muatPreferensi() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);
    document.querySelector("#paket").value = preferensi.paket ?? "";
    const topik = document.querySelector(`input[name="topik"][value="${preferensi.topik}"]`);
    console.log("Memuat preferensi:", preferensi, "Topik yang dipilih:", topik);
    if (topik) topik.checked = true;
  } catch (error) {
    console.warn("Preferensi tidak valid.", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

const tombolHapus = document.querySelector("#hapus-preferensi");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return;
  simpanPreferensi();
});

tombolHapus?.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formFeedback.textContent = "Preferensi tersimpan berhasil dihapus.";
  formFeedback.classList.remove("success");
});

document.addEventListener("DOMContentLoaded", () => {
  muatPreferensi();
});