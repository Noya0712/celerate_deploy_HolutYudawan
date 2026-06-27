import { useState } from "react";
import { Link } from "react-router-dom";
import { gunakanResep } from "../App";
import { formatRupiah } from "../utils/pembayaran";
import ModalPembayaran from "../components/ModalPembayaran";
import InspekturKulkas from "../components/InspekturKulkas";

// ============================================================
// KOMPONEN MODAL DAFTAR RESEP PREMIUM
// Muncul ketika card "Resep Premium" diklik
// ============================================================
function ModalResepPremium({ daftarResepPremium, resepDibeli, onPilihResep, onTutup }) {
  return (
    // Latar gelap semi-transparan
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onTutup}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Cegah klik di dalam modal menutup modal
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👑</span>
            <div>
              <h2 className="text-white font-bold text-xl">Resep Premium</h2>
              <p className="text-yellow-100 text-sm">{daftarResepPremium.length} resep eksklusif tersedia</p>
            </div>
          </div>
          <button
            onClick={onTutup}
            className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Daftar Resep Premium */}
        <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
          {daftarResepPremium.map((resep) => {
            const sudahDibeli = resepDibeli.includes(resep.id);
            return (
              <button
                key={resep.id}
                onClick={() => onPilihResep(resep)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-orange-50 border-b border-gray-100 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{resep.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition">
                      {resep.nama}
                    </p>
                    <p className="text-sm text-gray-400">
                      {resep.kategori} · {resep.waktuMasak} · {resep.porsi} porsi
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {sudahDibeli ? (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Dimiliki
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-700 font-bold text-sm px-3 py-1 rounded-full">
                      {formatRupiah(resep.harga)}
                    </span>
                  )}
                  <span className="text-gray-300 group-hover:text-orange-400 transition">›</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// KOMPONEN PANEL DETAIL + BELI RESEP PREMIUM
// Muncul ketika salah satu resep premium dipilih
// ============================================================
function PanelBeliResep({ resep, sudahDibeli, onBeliSekarang, onTutup }) {
  return (
    // Latar gelap semi-transparan
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onTutup}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Panel */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white relative">
          <button
            onClick={onTutup}
            className="absolute top-4 right-4 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition text-xl font-bold"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{resep.emoji}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  👑 PREMIUM
                </span>
              </div>
              <h2 className="font-bold text-xl leading-tight">{resep.nama}</h2>
              <p className="text-yellow-100 text-sm mt-1">
                {resep.kategori} · {resep.waktuMasak} · {resep.porsi} porsi
              </p>
            </div>
          </div>
        </div>

        {/* Isi Panel */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resep.deskripsi}</p>

          {/* Preview bahan (disamarkan) */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5 relative overflow-hidden">
            <p className="text-sm font-semibold text-gray-700 mb-2">Preview Bahan-bahan:</p>
            <ul className="space-y-1 text-sm text-gray-500">
              {resep.bahan.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-orange-400">•</span> {b}
                </li>
              ))}
            </ul>
            {/* Efek blur untuk bahan selanjutnya */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 italic mt-1">
              + {resep.bahan.length - 3} bahan lainnya tersembunyi...
            </p>
          </div>

          {sudahDibeli ? (
            // Sudah dibeli — tampilkan pesan sukses
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className="font-bold text-green-700">Resep Sudah Dimiliki!</p>
              <p className="text-green-600 text-sm">Resep ini sudah masuk ke daftar resep Anda.</p>
            </div>
          ) : (
            // Belum dibeli — tampilkan info harga & tombol beli
            <>
              {/* Kotak harga + pesan */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 text-center">
                <p className="text-gray-500 text-sm mb-1">Beli Paket Premium Dulu</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatRupiah(resep.harga)}
                </p>
                <p className="text-gray-400 text-xs mt-1">Bayar sekali, akses selamanya</p>
              </div>

              {/* Tombol Beli */}
              <button
                onClick={onBeliSekarang}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                💳 Beli Sekarang
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 Pembayaran aman · Akses selamanya setelah bayar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HALAMAN BERANDA — komponen utama
// ============================================================
export default function HalamanBeranda() {
  const { daftarResep, daftarResepPremium, resepDibeli, beliResepPremium } = gunakanResep();

  // State untuk modal daftar resep premium
  const [tampilModalPremium, setTampilModalPremium] = useState(false);

  // State untuk panel detail pembelian resep yang dipilih
  const [resepPremiumDipilih, setResepPremiumDipilih] = useState(null);

  // State untuk menampilkan modal pembayaran Midtrans (simulasi)
  const [tampilModalBayar, setTampilModalBayar] = useState(false);

  // Total resep (termasuk yang sudah dibeli dari premium)
  const totalResepSendiri = daftarResep.length;

  // Fungsi ketika tombol "Beli Sekarang" diklik di panel
  function handleBeliSekarang() {
    // Tutup panel detail, buka modal pembayaran
    setTampilModalBayar(true);
  }

  // Fungsi ketika pembayaran berhasil dikonfirmasi
  function handleBerhasilBeli(resep) {
    // Tambahkan resep ke daftar milik sendiri
    beliResepPremium(resep);

    // Tutup semua modal
    setTampilModalBayar(false);
    setResepPremiumDipilih(null);
    setTampilModalPremium(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* ===== BANNER HERO ===== */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-8 text-white text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          🍽️ Selamat Datang di Dapur Holut Yudawan
        </h1>
        <p className="text-orange-100 text-lg mb-6">
          Temukan dan simpan resep masakan favoritmu di satu tempat
        </p>
        <Link
          to="/resep"
          className="bg-white text-orange-600 font-bold px-6 py-2 rounded-full hover:bg-orange-100 transition">
          Lihat Semua Resep →
        </Link>
      </div>

      {/* ===== 3 CARD STATISTIK ===== */}
      <div className="grid grid-cols-3 gap-4 mb-10">

        {/* Card 1: Total Resep */}
        <div className="bg-white rounded-xl shadow p-5 text-center border border-orange-100">
          <p className="text-3xl font-bold text-orange-600">
            {totalResepSendiri}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Resep</p>
        </div>

        {/* Card 2: Resep Premium */}
        <button
          onClick={() => setTampilModalPremium(true)}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow p-5 text-center border border-yellow-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition" />
          <p className="text-3xl font-bold text-white">👑</p>
          <p className="text-2xl font-bold text-white mt-1">{daftarResepPremium.length}</p>
          <p className="text-yellow-100 text-sm mt-1 font-medium">Resep Premium</p>
          <p className="text-yellow-200 text-xs mt-0.5">Klik untuk lihat →</p>
        </button>

        {/* Card 3: Mudah Diikuti */}
        <div className="bg-white rounded-xl shadow p-5 text-center border border-orange-100">
          <p className="text-3xl font-bold text-orange-600">✅</p>
          <p className="text-gray-500 text-sm mt-1">Mudah Diikuti</p>
        </div>

      </div>

      {/* ===== RESEP PILIHAN ===== */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resep Pilihan</h2>
      <div className="grid grid-cols-2 gap-4">
        {daftarResep.slice(0, 4).map((resep) => (
          <Link
            key={resep.id}
            to={`/resep/${resep.id}`}
            className="bg-white rounded-xl shadow hover:shadow-md border border-orange-100 p-4 flex items-center gap-3 transition hover:-translate-y-1">
            <span className="text-4xl">{resep.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">{resep.nama}</p>
                {resep.isPremium && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    👑 Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-orange-500">
                {resep.kategori} · {resep.waktuMasak}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== INSPEKTUR KULKAS — AI Rekomendasi Resep ===== */}
      <InspekturKulkas semuaResep={daftarResep} />

      {/* ===== MODAL DAFTAR RESEP PREMIUM ===== */}
      {tampilModalPremium && !resepPremiumDipilih && (
        <ModalResepPremium
          daftarResepPremium={daftarResepPremium}
          resepDibeli={resepDibeli}
          onPilihResep={(resep) => {
            setResepPremiumDipilih(resep);
            // Tidak tutup modal premium supaya animasi lebih smooth
          }}
          onTutup={() => setTampilModalPremium(false)}
        />
      )}

      {/* ===== PANEL DETAIL & BELI RESEP PREMIUM ===== */}
      {resepPremiumDipilih && !tampilModalBayar && (
        <PanelBeliResep
          resep={resepPremiumDipilih}
          sudahDibeli={resepDibeli.includes(resepPremiumDipilih.id)}
          onBeliSekarang={handleBeliSekarang}
          onTutup={() => {
            setResepPremiumDipilih(null);
            setTampilModalPremium(true);
          }}
        />
      )}

      {/* ===== MODAL PEMBAYARAN (Simulasi Midtrans) ===== */}
      {tampilModalBayar && resepPremiumDipilih && (
        <ModalPembayaran
          resep={resepPremiumDipilih}
          onBerhasil={handleBerhasilBeli}
          onTutup={() => setTampilModalBayar(false)}
        />
      )}

    </div>
  );
}
