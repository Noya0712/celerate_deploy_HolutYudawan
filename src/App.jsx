import { Outlet, Link } from "react-router-dom";
import { useState, createContext, useContext } from "react";

const ResepContext = createContext();

const dataResepAwal = [
  {
    id: "resep-1",
    nama: "Nasi Goreng Spesial",
    kategori: "Makanan Berat",
    waktuMasak: "20 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🍳",
  },

  {
    id: "resep-1",
    nama: "Ikan Bakar Madu",
    kategori: "Makanan Berat",
    waktuMasak: "20 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🥩",
  },

  {
    id: "resep-1",
    nama: "seblak kuah pedas",
    kategori: "Makanan Berat",
    waktuMasak: "15 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🍱",
  },

  {
    id: "resep-1",
    nama: "gule ayam",
    kategori: "Makanan Berat",
    waktuMasak: "25 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🍳",
  },

  {
    id: "resep-1",
    nama: "Nasi Padang",
    kategori: "Makanan Berat",
    waktuMasak: "15 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🥙",
  },

  {
    id: "resep-1",
    nama: "Nasi Kuah Spesial",
    kategori: "Makanan Berat",
    waktuMasak: "20 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🦪",
  },

  {
    id: "resep-1",
    nama: "Teh Tarik Spesial",
    kategori: "Minuman Diging",
    waktuMasak: "10 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "2 butir telur",
      "3 siung bawang merah",
      "2 siung bawang putih",
      "kecap manis",
      "garam",
      "minyak goreng",
    ],
    langkah: [
      "Panaskan minyak, tumis bawang merah dan bawang putih hingga harum.",
      "Masukkan telur, orak-arik hingga setengah matang.",
      "Masukkan nasi, aduk rata bersama telur.",
      "Tambahkan kecap manis dan garam, aduk hingga tercampur merata.",
      "Sajikan selagi panas.",
    ],
    emoji: "🍵",
  },
];

export function ResepProvider({ children }) {
  const [daftarResep, setDaftarResep] = useState(dataResepAwal);

  function tambahResep(resepBaru) {
    const idBaru = "resep-" + Date.now();
    setDaftarResep((prev) => [...prev, { ...resepBaru, id: idBaru }]);
  }

  function hapusResep(id) {
    setDaftarResep((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <ResepContext.Provider value={{ daftarResep, tambahResep, hapusResep }}>
      {children}
    </ResepContext.Provider>
  );
}

// Hook ini kita export agar bisa dipakai di halaman lain
export function gunakanResep() {
  return useContext(ResepContext);
}

function Navbar() {
  return (
    <nav className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          🍴 Dapur Holut Yudawan
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-orange-200 transition">
            Beranda
          </Link>
          <Link to="/resep" className="hover:text-orange-200 transition">
            Resep
          </Link>
          <Link to="/tentang" className="hover:text-orange-200 transition">
            Tentang
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <ResepProvider>
      <div className="min-h-screen bg-orange-50 font-sans">
        <Navbar />
        {/* Halaman-halaman akan dirender di dalam Outlet */}
        <Outlet />
      </div>
    </ResepProvider>
  );
}
