"use strict";

console.log("P10 JavaScript aktif");

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

function formatRupiah(nilai) {
  return `Rp${new Intl.NumberFormat("id-ID").format(nilai)}`;
}

console.log(formatRupiah(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "tersedia" };
}

console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

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

function labelAksi(stok) {
  return stok > 0 ? "Siap dipesan" : "Hubungi admin";
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card${produk.unggulan ? " is-unggulan" : ""}">
        <p class="js-product-kategori">${labelKategori(produk.kategori)}</p>
        <h3>${produk.nama}</h3>
        <p class="js-product-deskripsi">${produk.deskripsi}</p>
        <p class="price">${formatRupiah(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p class="js-product-unggulan">${labelUnggulan(produk.unggulan)}</p>
        <p class="js-product-aksi">${labelAksi(produk.stok)}</p>
      </article>
  `;
}

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  card.append(title, category, price, stock);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    return;
  }

  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  console.log("Render kategori:", kategoriAktif);

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
  console.table(produkTersedia);
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

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderProduk();
  initMobileNavigation();
});
