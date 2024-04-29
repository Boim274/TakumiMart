// Membuat variabel router dengan menggunakan modul express dan method Router
const router = require("express").Router();
// Mengimpor controller yang dibutuhkan
const produkController = require("../controllers/produkController");

// Menentukan endpoint untuk produk
router.get("/", produkController.viewProduk); // Endpoint untuk menampilkan produk
router.post("/", produkController.addProduk); //untuk menambahkan data produk
router.put("/", produkController.updateProduk); // untuk edit data produk
router.delete("/:id", produkController.deleteProduk);// untuk delete data produk
// Mengekspor router agar dapat digunakan di file lain
module.exports = router;
