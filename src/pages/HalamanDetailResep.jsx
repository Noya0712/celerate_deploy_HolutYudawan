import { useParams, useNavigate } from "react-router-dom";
import { gunakanResep } from "../App";
import SousChef from "../components/SousChef";

export default function HalamanDetailResep() {
  const { id } = useParams();
  const { daftarResep } = gunakanResep();
  const navigate = useNavigate();

  const resep = daftarResep.find(r => r.id === id);

  // Jika resep tidak ditemukan
  if (!resep) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Resep Tidak Ditemukan</h2>
        <p className="text-gray-400 mb-6">
          Resep dengan ID <code className="bg-gray-100 px-2 py-1 rounded">{id}</code> tidak ada.
        </p>
        <button
          onClick={() => navigate("/resep")}
          className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition"
        >
          ← Kembali ke Daftar Resep
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="text-orange-600 hover:text-orange-800 mb-6 flex items-center gap-1 font-medium"
      >
        ← Kembali
      </button>

      {/* Card utama resep */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">

        {/* Header resep */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 text-white">
          <p className="text-6xl mb-2">{resep.emoji}</p>
          <h1 className="text-3xl font-bold">{resep.nama}</h1>
          <div className="flex gap-4 mt-2 text-orange-100 text-sm flex-wrap">
            <span>📂 {resep.kategori}</span>
            <span>⏱️ {resep.waktuMasak}</span>
            <span>🍽️ {resep.porsi} porsi</span>
            {resep.isPremium && (
              <span className="bg-yellow-400/30 px-2 py-0.5 rounded-full">👑 Premium</span>
            )}
          </div>
        </div>

        {/* Bahan-bahan dan langkah memasak */}
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">Bahan-bahan</h2>
            <ul className="space-y-2">
              {resep.bahan.map((bahan, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-orange-400 mt-1">•</span>
                  {bahan}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">Cara Memasak</h2>
            <ol className="space-y-3">
              {resep.langkah.map((langkah, i) => (
                <li key={i} className="flex gap-3 text-gray-600">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {langkah}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Banner ajakan tanya AI Sous-Chef */}
        <div className="mx-6 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 flex items-center gap-4">
          <span className="text-3xl">👨‍🍳</span>
          <div className="flex-1">
            <p className="font-bold text-orange-700 text-sm">
              Punya pertanyaan tentang resep ini?
            </p>
            <p className="text-orange-500 text-xs mt-0.5">
              Tanya <strong>Si Sous-Chef</strong> di pojok kanan bawah! Bisa substitusi bahan, ubah porsi, atau tips vegetarian.
            </p>
          </div>
          <div className="flex-shrink-0 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
            👇 Pojok Kanan
          </div>
        </div>
      </div>

      {/* ===== SI SOUS-CHEF — Floating AI Chat ===== */}
      {/* Tombol mengambang ini tampil di pojok kanan bawah layar */}
      <SousChef resep={resep} />
    </div>
  );
}