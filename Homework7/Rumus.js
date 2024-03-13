// Definisikan fungsi untuk menghitung luas persegi
exports.luasPersegi = function (sisi) {
  return 4 * sisi;
};

// Mencari keliling persegi
exports.kelilingPersegi = function (sisi1, luas2) {
  return sisi1 * luas2;
};

// Fungsi untuk menghitung luas persegi panjang
exports.luasPersegiPanjang = function (panjang, lebar) {
  return panjang * lebar;
};

// Fungsi untuk menghitung keliling persegi panjang
exports.kelilingPersegiPanjang = function (panjang, lebar) {
  return 2 * (panjang + lebar);
};
