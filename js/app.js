"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  {
    nama: "Arabika Gayo Premium",
    kategori: "Kopi",
    harga: 85000,
    stok: 12,
    unggulan: true,
    deskripsi: "Single origin dataran tinggi Aceh, aroma floral dengan keasaman cerah.",
  },
  {
    nama: "Robusta Temanggung",
    kategori: "Kopi",
    harga: 65000,
    stok: 4,
    unggulan: false,
    deskripsi: "Body tebal dan aftertaste cokelat pahit, cocok untuk espresso.",
  },
  {
    nama: "Paket Seduh Rumahan",
    kategori: "Bundling",
    harga: 125000,
    stok: 0,
    unggulan: true,
    deskripsi: "Biji 250 gram, paper filter, dan panduan seduh untuk pemula.",
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Minuman",
    harga: 22000,
    stok: 8,
    unggulan: false,
    deskripsi: "Diseduh dingin selama 12 jam dengan pemanis gula aren cair.",
  },
  {
    nama: "Cookies Chocolate Chip",
    kategori: "Camilan",
    harga: 15000,
    stok: 3,
    unggulan: false,
    deskripsi: "Camilan renyah pendamping kopi, dipanggang setiap pagi.",
  },
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelUnggulan(unggulan) {
  return unggulan ? "Produk unggulan" : "Produk reguler";
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

const labelAksi = produkUmkm.stok > 0 ? "Siap dipesan" : "Hubungi admin";

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // Penjaga: halaman lain tetap bebas error karena hanya produk.html
  // yang menyediakan kedua elemen ini.
  if (!grid || !ringkasan) {
    return;
  }

  console.log("P09 JavaScript aktif di halaman produk");
  console.table(produkUmkm);

  let jumlahTersedia = 0;
  let jumlahUnggulan = 0;
  let nilaiStok = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const unggulan = labelUnggulan(produk.unggulan);
    const aksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin untuk restock";

    // Operator aritmetika untuk ringkasan
    nilaiStok += produk.harga * produk.stok;

    if (produk.stok > 0) {
      jumlahTersedia++;
    }

    if (produk.unggulan) {
      jumlahUnggulan++;
    }
    markup += `
      <article class="js-product-card${produk.unggulan ? " is-unggulan" : ""}">
        <p class="js-product-kategori">${kategori}</p>
        <h3>${produk.nama}</h3>
        <p class="js-product-deskripsi">${produk.deskripsi}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p class="js-product-unggulan">${unggulan}</p>
        <p class="js-product-aksi">${aksi}</p>
      </article>
    `;
  }

   grid.innerHTML = markup.trim();

  const total = produkUmkm.length;
  const jumlahHabis = total - jumlahTersedia;

  ringkasan.textContent =
    jumlahHabis > 0
      ? `${jumlahTersedia} dari ${total} produk siap dipesan, ${jumlahHabis} produk perlu restock. ${jumlahUnggulan} produk berlabel unggulan. Nilai stok ${formatRupiah.format(nilaiStok)}.`
      : `Semua ${total} produk siap dipesan. ${jumlahUnggulan} produk berlabel unggulan. Nilai stok ${formatRupiah.format(nilaiStok)}.`;

  console.log("Render selesai:", jumlahTersedia, "produk tersedia dari", total, "data");
}

function initMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-links");

  if (!toggle || !menu) {
    return;
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    menu.classList.toggle("is-open", !isExpanded);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduk();
  initMobileNavigation();
});