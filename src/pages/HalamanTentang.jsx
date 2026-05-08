export default function HalamanTentang() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow border border-orange-100 p-8">
        <div className="text-center mb-8">
          <p className="text-6xl mb-3">🍴</p>
          <h1 className="text-3xl font-bold text-gray-800">Tentang Dapur Holut Yudawan</h1>
          <p className="text-gray-500 mt-2">Aplikasi resep masakan Indonesia</p>
        </div>
        <div className="space-y-5 text-gray-600 leading-relaxed">
          <p><strong className="text-orange-600">Dapur Holut Yudawan</strong> adalah aplikasi web sederhana yang dibuat untuk membantu kamu menyimpan dan mengelola resep masakan favoritmu.</p>
          <p>Aplikasi ini dibuat sebagai tugas pembelajaran <em>Frontend Routing dan State Management</em> menggunakan <strong>React</strong>, <strong>React Router</strong>, dan <strong>TailwindCSS</strong>.</p>
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <h2 className="font-bold text-orange-700 mb-3">Fitur Aplikasi</h2>
            <ul className="space-y-2">
              <li className="flex gap-2"> <span>Melihat daftar resep masakan</span></li>
              <li className="flex gap-2"> <span>Menambah resep baru</span></li>
              <li className="flex gap-2"> <span>Menghapus resep</span></li>
              <li className="flex gap-2"> <span>Melihat detail resep berdasarkan ID (dynamic route)</span></li>
              <li className="flex gap-2"> <span>Halaman 404 untuk rute yang tidak ditemukan</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}