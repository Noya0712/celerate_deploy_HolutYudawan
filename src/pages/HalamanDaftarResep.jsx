import { useState } from "react";
import { Link } from "react-router-dom";
import { gunakanResep } from "../App";

export default function HalamanDaftarResep() {
  const { daftarResep, tambahResep, hapusResep } = gunakanResep();
  const [tampilForm, setTampilForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: "", kategori: "", waktuMasak: "", porsi: 1, emoji: "🍽️", bahan: "", langkah: ""
  });

  function handleSubmit() {
    if (!formData.nama || !formData.kategori) return alert("Nama dan kategori wajib diisi!");
    tambahResep({
      ...formData,
      porsi: Number(formData.porsi),
      bahan: formData.bahan.split("\n").filter(b => b.trim()),
      langkah: formData.langkah.split("\n").filter(l => l.trim())
    });
    setFormData({ nama: "", kategori: "", waktuMasak: "", porsi: 1, emoji: "🍽️", bahan: "", langkah: "" });
    setTampilForm(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Resep</h1>
        <button
          onClick={() => setTampilForm(!tampilForm)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-medium"
        >
          {tampilForm ? "✕ Tutup" : "+ Tambah Resep"}
        </button>
      </div>

      {tampilForm && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-orange-700 mb-4 text-lg">Tambah Resep Baru</h2>
          <div className="grid grid-cols-2 gap-3">
            <input className="border border-orange-200 rounded-lg px-3 py-2 col-span-2 focus:outline-orange-400" placeholder="Nama resep *" value={formData.nama} onChange={e => setFormData({ ...formData, nama: e.target.value })} />
            <input className="border border-orange-200 rounded-lg px-3 py-2 focus:outline-orange-400" placeholder="Kategori *" value={formData.kategori} onChange={e => setFormData({ ...formData, kategori: e.target.value })} />
            <input className="border border-orange-200 rounded-lg px-3 py-2 focus:outline-orange-400" placeholder="Waktu masak (cth: 30 menit)" value={formData.waktuMasak} onChange={e => setFormData({ ...formData, waktuMasak: e.target.value })} />
            <input className="border border-orange-200 rounded-lg px-3 py-2 focus:outline-orange-400" placeholder="Emoji (cth: 🍜)" value={formData.emoji} onChange={e => setFormData({ ...formData, emoji: e.target.value })} />
            <input type="number" className="border border-orange-200 rounded-lg px-3 py-2 focus:outline-orange-400" placeholder="Porsi" min={1} value={formData.porsi} onChange={e => setFormData({ ...formData, porsi: e.target.value })} />
            <textarea className="border border-orange-200 rounded-lg px-3 py-2 col-span-2 focus:outline-orange-400" placeholder="Bahan-bahan (satu baris = satu bahan)" rows={3} value={formData.bahan} onChange={e => setFormData({ ...formData, bahan: e.target.value })} />
            <textarea className="border border-orange-200 rounded-lg px-3 py-2 col-span-2 focus:outline-orange-400" placeholder="Langkah memasak (satu baris = satu langkah)" rows={3} value={formData.langkah} onChange={e => setFormData({ ...formData, langkah: e.target.value })} />
          </div>
          <button onClick={handleSubmit} className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-medium">Simpan Resep</button>
        </div>
      )}

      {daftarResep.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-3">🍽️</p>
          <p>Belum ada resep. Tambahkan resep pertamamu!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {daftarResep.map(resep => (
            <div key={resep.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition">
              <Link to={`/resep/${resep.id}`} className="flex items-center gap-4 flex-1">
                <span className="text-4xl">{resep.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{resep.nama}</p>
                  <p className="text-sm text-gray-500">{resep.kategori} · {resep.waktuMasak} · {resep.porsi} porsi</p>
                </div>
              </Link>
              <button onClick={() => hapusResep(resep.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition text-sm">Hapus</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}