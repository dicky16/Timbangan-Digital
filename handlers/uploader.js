const fs = require('fs');
// import fungsi yang diperlukan dari helper uploader
const {
  getValidExtension,
  randomFilename,
  saveImage
} = require('../helper/uploader');

exports.single = async (req, res) => {
  try {
    // jika tidak ada file yang diupload beri pesan error
    if ( ! req.file) {
      return res.status(422).json({ message: `File tidak ditemukan.` });
    }

    // cek ekstensi file
    const extension = await getValidExtension(req.file.originalname);
    // jika ekstensi tidak sesuai
    if ( ! extension) {
      // hapus hasil upload
      fs.unlinkSync(req.file.path);
      // kembalikan respon error
      return res.status(422).json({ message: `Format file tidak valid.` });
    }

    // buat nama file baru secara random
    const filename = await randomFilename(16);
    // ambil direktori file yang disimpan oleh multer
    const pathFrom = req.file.path;
    // buat direktori penyimpanan file
    const pathTo = `public/images/${filename}.${extension}`;
    // simpan gambar
    saveImage(pathFrom, pathTo);

    const response = {
      message: 'Upload berhasil.',
      image_path: pathTo
    }

    return res.json(response);
  }
  catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}