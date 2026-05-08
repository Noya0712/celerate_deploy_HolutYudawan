import { useParams, useNavigate } from "react-router-dom";
import { gunakanResep } from "../App";

export default function HalamanDetailResep() {
  const { id } = useParams();
  const { daftarResep } = gunakanResep();
  const navigate = useNavigate();

  const resep = daftarResep.find(r => r.id === id);

  if (!resep) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Resep Tidak Ditemukan</h2>
        <p className="text-gray-400 mb-6">Resep dengan ID <code className="bg-gray-100 px-2 py-1 rounded">{id}</code> tidak ada.</p>
        <button onClick={() => navigate("/resep")} className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition">← Kembali ke Daftar Resep</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="text-orange-600 hover:text-orange-800 mb-6 flex items-center gap-1 font-medium">← Kembali</button>
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 p-6 text-white">
          <p className="text-6xl mb-2">{resep.emoji}</p>
          <h1 className="text-3xl font-bold">{resep.nama}</h1>
          <div className="flex gap-4 mt-2 text-orange-100 text-sm">
            <span>📂 {resep.kategori}</span>
            <span>⏱️ {resep.waktuMasak}</span>
            <span>🍽️ {resep.porsi} porsi</span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">Bahan-bahan</h2>
            <ul className="space-y-2">
              {resep.bahan.map((bahan, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600"><span className="text-orange-400 mt-1">•</span>{bahan}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">Cara Memasak</h2>
            <ol className="space-y-3">
              {resep.langkah.map((langkah, i) => (
                <li key={i} className="flex gap-3 text-gray-600">
                  <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>{langkah}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}