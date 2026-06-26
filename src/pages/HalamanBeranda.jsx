import { Link } from "react-router-dom";
import { gunakanResep } from "../App";

export default function HalamanBeranda() {
  const { daftarResep } = gunakanResep();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
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

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow p-5 text-center border border-orange-100">
          <p className="text-3xl font-bold text-orange-600">
            {daftarResep.length}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Resep</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 text-center border border-orange-100">
          <p className="text-3xl font-bold text-orange-600">🆓</p>
          <p className="text-gray-500 text-sm mt-1">Gratis Selamanya</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 text-center border border-orange-100">
          <p className="text-3xl font-bold text-orange-600">✅</p>
          <p className="text-gray-500 text-sm mt-1">Mudah Diikuti</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resep Pilihan</h2>
      <div className="grid grid-cols-2 gap-4">
        {daftarResep.slice(0, 4).map((resep) => (
          <Link
            key={resep.id}
            to={`/resep/${resep.id}`}
            className="bg-white rounded-xl shadow hover:shadow-md border border-orange-100 p-4 flex items-center gap-3 transition hover:-translate-y-1">
            <span className="text-4xl">{resep.emoji}</span>
            <div>
              <p className="font-semibold text-gray-800">{resep.nama}</p>
              <p className="text-sm text-orange-500">
                {resep.kategori} · {resep.waktuMasak}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
