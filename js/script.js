const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
  promoButton.textContent = "Gratis kopi untuk 10 pembeli pertama!";
  console.log("tombol promo diklik.");
  console.log("Promo Nusantara Lestari Coffee berhasil ditampilkan.");
});