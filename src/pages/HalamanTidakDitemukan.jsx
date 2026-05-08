import { useNavigate } from "react-router-dom";

export default function HalamanTidakDitemukan() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-8xl mb-4">🍽️</p>
      <h1 className="text-6xl font-bold text-orange-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-400 mb-8">Maaf, halaman yang kamu cari tidak ada di Dapur Holut Yudawan.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => navigate("/")} className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-medium">Ke Beranda</button>
        <button onClick={() => navigate("/resep")} className="bg-white text-orange-600 border border-orange-300 px-6 py-2 rounded-lg hover:bg-orange-50 transition font-medium">Lihat Resep</button>
      </div>
    </div>
  );
}