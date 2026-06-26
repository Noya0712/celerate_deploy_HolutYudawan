import { useState } from "react";
import { formatRupiah, buatDataTransaksi } from "../utils/pembayaran";

// ============================================================
// DAFTAR METODE PEMBAYARAN (simulasi)
// ============================================================
const metodePembayaran = [
  {
    id: "bca",
    nama: "Transfer BCA",
    ikon: "🏦",
    nomorRekening: "1234567890",
    atasnama: "PT Dapur Holut",
  },
  {
    id: "bni",
    nama: "Transfer BNI",
    ikon: "🏛️",
    nomorRekening: "0987654321",
    atasnama: "PT Dapur Holut",
  },
  {
    id: "mandiri",
    nama: "Transfer Mandiri",
    ikon: "🏢",
    nomorRekening: "1122334455",
    atasnama: "PT Dapur Holut",
  },
  {
    id: "gopay",
    nama: "GoPay",
    ikon: "💚",
    nomorRekening: "081234567890",
    atasnama: "Dapur Holut",
  },
  {
    id: "ovo",
    nama: "OVO",
    ikon: "💜",
    nomorRekening: "081234567890",
    atasnama: "Dapur Holut",
  },
  {
    id: "qris",
    nama: "QRIS",
    ikon: "📱",
    nomorRekening: null,
    atasnama: null,
  },
];

// ============================================================
// KOMPONEN MODAL PEMBAYARAN — Simulasi realistis
// ============================================================
export default function ModalPembayaran({ resep, onBerhasil, onTutup }) {
  // Langkah pembayaran:
  // "pilih" → "konfirmasi" → "memproses" → "sukses"
  const [langkah, setLangkah] = useState("pilih");
  const [metodeDipilih, setMetodeDipilih] = useState(null);

  // Data transaksi simulasi
  const dataTransaksi = buatDataTransaksi(resep);

  // ---- LANGKAH 1: Pilih Metode ----
  function handlePilihMetode(metode) {
    setMetodeDipilih(metode);
    setLangkah("konfirmasi");
  }

  // ---- LANGKAH 2: Konfirmasi → proses ----
  function handleKonfirmasi() {
    setLangkah("memproses");

    // Simulasi waktu proses pembayaran (2 detik)
    setTimeout(() => {
      setLangkah("sukses");
    }, 2000);
  }

  // ---- LANGKAH 3: Selesai → panggil callback berhasil ----
  function handleSelesai() {
    onBerhasil(resep);
  }

  return (
    // Overlay gelap
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">

        {/* ===== HEADER MODAL ===== */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo simulasi Midtrans */}
            <div className="bg-white rounded-lg px-2 py-1">
              <span className="text-blue-600 font-black text-sm tracking-tight">midtrans</span>
            </div>
            <span className="text-white/80 text-sm">Pembayaran Aman</span>
          </div>
          {langkah !== "memproses" && langkah !== "sukses" && (
            <button
              onClick={onTutup}
              className="text-white/70 hover:text-white transition text-xl font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* ===== INFO PRODUK ===== */}
        {langkah !== "sukses" && (
          <div className="bg-blue-50 px-6 py-3 flex items-center justify-between border-b border-blue-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{resep.emoji}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{resep.nama}</p>
                <p className="text-xs text-gray-500">Resep Premium · Akses Selamanya</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600 text-lg">{formatRupiah(resep.harga)}</p>
              <p className="text-xs text-gray-400">Order: {dataTransaksi.orderId.slice(0, 20)}...</p>
            </div>
          </div>
        )}

        {/* ===== KONTEN BERDASARKAN LANGKAH ===== */}

        {/* -- LANGKAH 1: Pilih Metode Pembayaran -- */}
        {langkah === "pilih" && (
          <div className="p-6">
            <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Pilih Metode Pembayaran
            </p>
            <div className="space-y-2">
              {metodePembayaran.map((metode) => (
                <button
                  key={metode.id}
                  onClick={() => handlePilihMetode(metode)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{metode.ikon}</span>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition">
                      {metode.nama}
                    </span>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-400 transition">›</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -- LANGKAH 2: Konfirmasi Pembayaran -- */}
        {langkah === "konfirmasi" && metodeDipilih && (
          <div className="p-6">
            <button
              onClick={() => setLangkah("pilih")}
              className="text-blue-500 hover:text-blue-700 text-sm mb-4 flex items-center gap-1"
            >
              ← Ganti metode
            </button>

            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
                Detail Pembayaran
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{metodeDipilih.ikon}</span>
                <div>
                  <p className="font-bold text-gray-800">{metodeDipilih.nama}</p>
                  {metodeDipilih.nomorRekening && (
                    <p className="text-sm text-gray-500">
                      {metodeDipilih.nomorRekening}
                      <span className="text-gray-400"> · a.n {metodeDipilih.atasnama}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Harga Resep</span>
                  <span>{formatRupiah(resep.harga)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Admin</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base border-t border-gray-200 pt-2 mt-1">
                  <span>Total Bayar</span>
                  <span className="text-blue-600">{formatRupiah(resep.harga)}</span>
                </div>
              </div>
            </div>

            {/* QR Code simulasi jika metode QRIS */}
            {metodeDipilih.id === "qris" && (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-center mb-4">
                <div className="inline-grid grid-cols-5 gap-1 mb-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-sm ${Math.random() > 0.5 ? "bg-gray-800" : "bg-white border border-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">Scan QRIS untuk membayar</p>
              </div>
            )}

            <button
              onClick={handleKonfirmasi}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              ✓ Konfirmasi Pembayaran {formatRupiah(resep.harga)}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Transaksi dienkripsi dan aman
            </p>
          </div>
        )}

        {/* -- LANGKAH 3: Sedang Memproses -- */}
        {langkah === "memproses" && (
          <div className="p-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              {/* Lingkaran spinner */}
              <svg
                className="animate-spin w-20 h-20 text-blue-500"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle
                  cx="25" cy="25" r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="90 30"
                  className="opacity-30"
                />
                <circle
                  cx="25" cy="25" r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="45 75"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">{metodeDipilih?.ikon}</span>
              </div>
            </div>
            <p className="font-bold text-gray-800 text-lg">Memproses Pembayaran...</p>
            <p className="text-gray-400 text-sm mt-2">
              Jangan tutup halaman ini.
            </p>
            <div className="flex justify-center gap-1 mt-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* -- LANGKAH 4: Sukses! -- */}
        {langkah === "sukses" && (
          <div className="p-8 text-center">
            {/* Animasi centang berhasil */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-green-600 font-black text-2xl mb-1">Pembayaran Berhasil!</p>
            <p className="text-gray-500 text-sm mb-6">
              Resep <span className="font-semibold text-gray-700">{resep.nama}</span> sudah bisa diakses.
            </p>

            {/* Resi transaksi */}
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 text-sm">
              <p className="font-semibold text-gray-700 mb-3 text-center">🧾 Bukti Transaksi</p>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Order ID</span>
                  <span className="font-mono text-xs text-gray-500 text-right">{dataTransaksi.orderId.slice(0, 25)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Produk</span>
                  <span className="font-medium text-right">{resep.emoji} {resep.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span>Metode</span>
                  <span>{metodeDipilih?.ikon} {metodeDipilih?.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu</span>
                  <span className="text-xs">{dataTransaksi.waktu}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2 mt-1">
                  <span>Total Dibayar</span>
                  <span className="text-green-600">{formatRupiah(resep.harga)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Status</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                    SETTLEMENT
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSelesai}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition shadow-md hover:shadow-lg"
            >
              🎉 Lihat Resep Sekarang
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
