// Membuat variabel Produk dan mengimport/require dari model Produk
const Produk = require("../models/Produk");

module.exports = {
  // Membuat view untuk produk
  viewProduk: async (req, res) => {
    try {
      // Menggunakan method find untuk mengambil semua data produk dari database
      const produk = await Produk.find();
      // Membuat variabel untuk alertMessage dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // Membuat objek alert yang berisi pesan dan status
      const alert = { message: alertMessage, status: alertStatus };
      // Merender view index dengan data produk dan alert
      res.render("index", {
        produk,
        alert,
        title: "CRUD Produk", // Memberikan judul aplikasi
      });
    } catch (error) {
      // Jika terjadi error, redirect ke halaman produk
      res.redirect("/produk");
    }
  },

  // Metode untuk membuat data produk
  addProduk: async (req, res) => {
    try {
      const { id, nama_produk, harga, deskripsi, kategori, gambar_produk } = req.body;
      await Produk.create({ id, nama_produk, harga, deskripsi, kategori, gambar_produk });
      req.flash("alertMessage", "Berhasil menambahkan Produk");
      req.flash("alertStatus", "success");
      res.redirect("/produk"); 
    } catch (error) {
      let message = error.message;
      if (error.code === 11000) {
        message = `A Produk with the id ${req.body.id} already exists.`;
      }
      req.flash("alertMessage", message);
      req.flash("alertStatus", "danger");
      res.redirect("/produk");
    }
  },

  // Metode untuk membaca data produk

  // Metode untuk memperbarui data produk
  updateProduk: async (req, res) => {
    try {
      const { id, nama_produk, harga, deskripsi, kategori, gambar_produk } = req.body;
      const produk = await Produk.findOne({ _id: id });
    produk.id = id;
    produk.nama_produk = nama_produk;
    produk.harga = harga;
    produk.deskripsi = deskripsi;
    produk.kategori = kategori;
    produk.gambar_produk = gambar_produk;
      // Menyimpan datanya ke database
      await produk.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Belhasil mengubah data Produk");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/produk");
    } catch (error) {
      let message = error.message;

      // Check for duplicate key error
      if (error.code === 11000) {
        message = `A Produk with the id ${req.body.id} already exists.`;
      }

      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", message);
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/produk)
      res.redirect("/produk");
    }
  },
  
  // Metode untuk menghapus data produk
  deleteProduk: async (req, res) => {
    try {
      const { id } = req.params;
      // Cek data Produk yang mau di delete berdasarkan id
      const produk = await Produk.findOne({ _id: id });

      // Check if the produk document was found
      if (!produk) {
        req.flash("alertMessage", "No produk found with that ID");
        req.flash("alertStatus", "danger");
        res.redirect("/produk");
        return; // Stop further execution
      }

      // Setelah datanya sudah didapat maka menghapusnya
      // Use delete() if remove() is not available
      await produk.deleteOne(); // or await Mahasiswa.deleteOne({ _id: id });

      // Ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Berhasil menghapus produk");
      req.flash("alertStatus", "warning");
      // Setelah berhasil remove maka melakukan redirect
      res.redirect("/produk");
    } catch (error) {
      // Ketika create data error memberikan notifikasi
      req.flash("alertMessage", $`{error.message}`);
      req.flash("alertStatus", "danger");
      // Ketika inputa kosong redirect kehalaman
      res.redirect("/produk");
    }
  },
};
