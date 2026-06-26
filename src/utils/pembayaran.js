// =============================================
// UTILITAS PEMBAYARAN — Simulasi Midtrans
// =============================================
// Karena pemanggilan Midtrans API langsung dari browser
// diblokir oleh CORS, kita gunakan simulasi pembayaran
// yang realistis dan selalu berhasil (untuk keperluan demo).

/**
 * Mensimulasikan pembuatan token pembayaran.
 * Di production nyata, ini harus dipanggil dari backend.
 *
 * @param {object} resep - Data resep yang akan dibeli
 * @returns {object} Data transaksi simulasi
 */
export function buatDataTransaksi(resep) {
  const idOrder = `ORDER-${resep.id.toUpperCase()}-${Date.now()}`;
  return {
    orderId: idOrder,
    namaResep: resep.nama,
    harga: resep.harga,
    emoji: resep.emoji,
    waktu: new Date().toLocaleString("id-ID"),
  };
}

/**
 * Format angka menjadi format mata uang Rupiah.
 * Contoh: 25000 → "Rp 25.000"
 *
 * @param {number} jumlah - Jumlah dalam angka
 * @returns {string} Format Rupiah
 */
export function formatRupiah(jumlah) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(jumlah);
}
