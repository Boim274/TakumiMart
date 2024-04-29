const mongoose = require("mongoose");

// Membuat variabel baru dengan nama ProdukScheme
const ProdukScheme = new mongoose.Schema({
  nama_produk: {
    // Type field nama_produk adalah string
    type: String,
    // Field nama_produk wajib diisi
    required: true,
  },
  harga: {
    // Type field harga adalah number
    type: Number,
    // Field harga wajib diisi
    required: true,
  },
  deskripsi: {
    // Type field deskripsi adalah string
    type: String,
    // Field deskripsi wajib diisi
    required: true,
  },
  kategori: {
    // Type field kategori_produk adalah string
    type: String,
    // Field kateori wajib diisi
    required: true,
  },
  gambar_produk: {
    // Type field gambar_produk adalah string
    type: String,
    // Field gambar_produk wajib diisi
    required: true,
  },
});

// Mengekspor model Produk, agar dapat digunakan di berbagai tempat dalam aplikasi
module.exports = mongoose.model("Produk", ProdukScheme);
