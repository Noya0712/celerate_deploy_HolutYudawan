import { Outlet, Link } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// =============================================
// CONTEXT — pusat data seluruh aplikasi
// =============================================
const ResepContext = createContext();

// =============================================
// DATA AWAL — resep gratis milik sendiri
// =============================================
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
    id: "resep-2",
    nama: "Ikan Bakar Madu",
    kategori: "Makanan Berat",
    waktuMasak: "20 menit",
    porsi: 2,
    bahan: [
      "1 ekor ikan kakap",
      "3 sdm madu",
      "2 sdm kecap manis",
      "1 sdm air jeruk nipis",
      "garam secukupnya",
      "merica secukupnya",
    ],
    langkah: [
      "Lumuri ikan dengan garam, merica, dan air jeruk nipis, diamkan 15 menit.",
      "Campur madu dan kecap manis sebagai saus.",
      "Bakar ikan di atas bara api, sambil diolesi saus madu.",
      "Balik ikan dan ulangi proses olesan setiap 3 menit.",
      "Sajikan dengan sambal dan lalapan.",
    ],
    emoji: "🥩",
  },
  {
    id: "resep-3",
    nama: "Seblak Kuah Pedas",
    kategori: "Makanan Berat",
    waktuMasak: "15 menit",
    porsi: 2,
    bahan: [
      "100 gram kerupuk basah",
      "2 butir telur",
      "5 buah cabe rawit",
      "2 siung bawang putih",
      "kencur secukupnya",
      "garam dan gula secukupnya",
    ],
    langkah: [
      "Rendam kerupuk dalam air panas hingga lunak.",
      "Haluskan cabai, bawang putih, dan kencur.",
      "Tumis bumbu halus hingga harum.",
      "Masukkan kerupuk dan telur, aduk rata.",
      "Tambahkan air secukupnya, masak hingga kuah mengental.",
    ],
    emoji: "🍱",
  },
  {
    id: "resep-4",
    nama: "Nasi Padang",
    kategori: "Makanan Berat",
    waktuMasak: "15 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi putih",
      "rendang sapi",
      "sambal balado",
      "telur dadar",
      "gulai nangka",
    ],
    langkah: [
      "Siapkan nasi putih di piring.",
      "Tata lauk seperti rendang, gulai, dan balado di atas nasi.",
      "Sajikan dengan kerupuk merah.",
    ],
    emoji: "🥙",
  },
  {
    id: "resep-5",
    nama: "Nasi Kuah Spesial",
    kategori: "Makanan Berat",
    waktuMasak: "20 menit",
    porsi: 2,
    bahan: [
      "2 piring nasi",
      "ayam kampung",
      "kaldu ayam",
      "wortel dan kentang",
      "garam, lada, bawang",
    ],
    langkah: [
      "Rebus ayam dengan bumbu hingga kaldu keluar.",
      "Masukkan wortel dan kentang, masak hingga lunak.",
      "Sajikan nasi dengan kuah dan potongan ayam.",
    ],
    emoji: "🦪",
  },
  {
    id: "resep-6",
    nama: "Teh Tarik Spesial",
    kategori: "Minuman Dingin",
    waktuMasak: "10 menit",
    porsi: 2,
    bahan: [
      "2 kantong teh",
      "200 ml susu kental manis",
      "air panas 400 ml",
      "gula sesuai selera",
    ],
    langkah: [
      "Seduh teh dalam air panas selama 5 menit.",
      "Tambahkan susu kental manis, aduk rata.",
      "Tarik-tarik teh di antara dua gelas hingga berbusa.",
      "Sajikan hangat atau tambahkan es batu.",
    ],
    emoji: "🍵",
  },
  {
    id: "resep-7",
    nama: "Gule Ayam Sederhana",
    kategori: "Makanan Berat",
    waktuMasak: "25 menit",
    porsi: 2,
    bahan: [
      "1 ekor ayam potong",
      "400 ml santan",
      "bumbu gulai instan",
      "daun salam dan serai",
      "garam dan gula secukupnya",
    ],
    langkah: [
      "Tumis bumbu gulai hingga harum.",
      "Masukkan ayam, aduk hingga berubah warna.",
      "Tuang santan, tambahkan daun salam dan serai.",
      "Masak dengan api kecil hingga ayam empuk.",
      "Sajikan hangat dengan nasi.",
    ],
    emoji: "🍲",
  },
];

// =============================================
// DATA RESEP PREMIUM — 10 resep berbayar
// =============================================
export const dataResepPremium = [
  {
    id: "premium-1",
    nama: "Gule Ayam Porsi Hajatan",
    kategori: "Makanan Berat",
    waktuMasak: "90 menit",
    porsi: 50,
    harga: 25000,
    emoji: "🍲",
    deskripsi: "Resep rahasia gule ayam untuk porsi hajatan 50 orang. Cita rasa autentik yang sudah teruji.",
    bahan: [
      "5 kg ayam kampung potong",
      "3 liter santan kental",
      "100 gram lengkuas",
      "50 gram kunyit",
      "200 gram bawang merah",
      "100 gram bawang putih",
      "10 batang serai",
      "20 lembar daun salam",
      "10 lembar daun jeruk",
      "garam dan gula merah secukupnya",
    ],
    langkah: [
      "Haluskan semua bumbu: bawang merah, bawang putih, kunyit, dan lengkuas.",
      "Tumis bumbu halus dengan minyak hingga benar-benar matang dan harum.",
      "Masukkan potongan ayam, aduk rata dengan bumbu hingga berubah warna.",
      "Tuang santan encer dulu, masak sambil sesekali diaduk.",
      "Tambahkan serai geprek, daun salam, dan daun jeruk.",
      "Setelah ayam setengah empuk, tuang santan kental.",
      "Masak terus dengan api kecil sambil diaduk agar santan tidak pecah.",
      "Koreksi rasa dengan garam dan gula merah.",
      "Masak hingga kuah mengental dan minyak mengambang.",
      "Sajikan dengan nasi putih dan kerupuk.",
    ],
  },
  {
    id: "premium-2",
    nama: "Rendang Daging Sapi Asli Padang",
    kategori: "Makanan Berat",
    waktuMasak: "180 menit",
    porsi: 10,
    harga: 30000,
    emoji: "🥩",
    deskripsi: "Rendang autentik khas Padang dengan bumbu rahasia yang diwariskan turun-temurun.",
    bahan: [
      "1 kg daging sapi",
      "2 liter santan kental",
      "15 cabai merah besar",
      "10 cabai merah keriting",
      "100 gram bawang merah",
      "50 gram bawang putih",
      "2 ruas jahe",
      "2 ruas lengkuas",
      "5 batang serai",
      "daun kunyit, daun salam, daun jeruk",
    ],
    langkah: [
      "Haluskan cabai, bawang merah, bawang putih, jahe, dan lengkuas.",
      "Campur santan, bumbu halus, dan semua rempah dalam wajan besar.",
      "Masukkan daging yang sudah dipotong dadu.",
      "Masak dengan api sedang sambil terus diaduk.",
      "Saat santan mulai menyusut, kecilkan api.",
      "Terus masak dan aduk hingga santan benar-benar kering.",
      "Daging akan berubah cokelat kehitaman saat rendang matang.",
      "Sajikan dengan nasi panas.",
    ],
  },
  {
    id: "premium-3",
    nama: "Soto Betawi Kuah Santan",
    kategori: "Makanan Berat",
    waktuMasak: "60 menit",
    porsi: 8,
    harga: 20000,
    emoji: "🍜",
    deskripsi: "Soto Betawi dengan kuah santan gurih yang kaya rempah, disajikan dengan emping dan acar.",
    bahan: [
      "500 gram daging sapi",
      "500 gram jeroan (babat/kikil)",
      "500 ml santan",
      "1 liter air kaldu",
      "bumbu soto: bawang, kunyit, jahe, lengkuas",
      "tomat, kentang, tomat ceri",
      "bawang goreng untuk taburan",
    ],
    langkah: [
      "Rebus daging dan jeroan hingga empuk, sisihkan kaldu.",
      "Haluskan bumbu soto dan tumis hingga matang.",
      "Masukkan kaldu daging ke dalam bumbu.",
      "Tambahkan santan, aduk hingga tercampur.",
      "Masukkan daging yang sudah dipotong.",
      "Masak hingga kuah mendidih dan harum.",
      "Sajikan dengan nasi, emping, dan taburan bawang goreng.",
    ],
  },
  {
    id: "premium-4",
    nama: "Ayam Geprek Sambal Rahasia",
    kategori: "Makanan Berat",
    waktuMasak: "45 menit",
    porsi: 4,
    harga: 15000,
    emoji: "🍗",
    deskripsi: "Ayam geprek dengan sambal rahasia level pedas yang bisa disesuaikan. Renyah di luar, juicy di dalam.",
    bahan: [
      "4 potong ayam",
      "tepung bumbu serbaguna",
      "20 cabai rawit (bisa disesuaikan)",
      "5 siung bawang putih",
      "garam, terasi, gula merah",
      "minyak untuk menggoreng",
    ],
    langkah: [
      "Marinasi ayam dengan bumbu selama 30 menit.",
      "Balur ayam dengan tepung bumbu hingga merata.",
      "Goreng ayam hingga kekuningan dan renyah.",
      "Uleg sambal: cabai rawit, bawang putih, terasi, gula, garam.",
      "Geprek ayam di atas sambal hingga sambal menyerap.",
      "Sajikan dengan nasi putih dan lalapan segar.",
    ],
  },
  {
    id: "premium-5",
    nama: "Nasi Liwet Sunda Spesial",
    kategori: "Makanan Berat",
    waktuMasak: "50 menit",
    porsi: 6,
    harga: 18000,
    emoji: "🍚",
    deskripsi: "Nasi liwet khas Sunda yang dimasak dengan santan dan rempah pilihan, lezat disantap bersama.",
    bahan: [
      "500 gram beras",
      "400 ml santan",
      "3 batang serai",
      "5 lembar daun salam",
      "4 lembar daun jeruk",
      "garam dan kaldu ayam",
      "1 ruas lengkuas geprek",
    ],
    langkah: [
      "Cuci beras hingga bersih.",
      "Campur beras, santan, dan semua rempah dalam panci.",
      "Masak dengan api sedang sambil sesekali diaduk.",
      "Saat air menyusut, tutup panci dan kecilkan api.",
      "Kukus dalam panci tertutup selama 20 menit.",
      "Sajikan dengan lauk pauk pilihan.",
    ],
  },
  {
    id: "premium-6",
    nama: "Bakso Sapi Super Kenyal",
    kategori: "Makanan Berat",
    waktuMasak: "120 menit",
    porsi: 8,
    harga: 22000,
    emoji: "🍢",
    deskripsi: "Bakso sapi kenyal dengan isian keju mozzarella yang meleleh. Resep bisnis kuliner populer.",
    bahan: [
      "1 kg daging sapi giling",
      "100 gram tepung tapioka",
      "50 gram tepung terigu",
      "5 siung bawang putih",
      "garam, lada, pala secukupnya",
      "es batu secukupnya",
      "100 gram keju mozzarella (isian)",
    ],
    langkah: [
      "Haluskan bawang putih dengan garam.",
      "Campur daging giling dengan tepung, bumbu, dan es batu.",
      "Uleni adonan hingga kalis dan licin.",
      "Bentuk bola-bola bakso dengan tangan basah.",
      "Isi tengah bakso dengan potongan keju mozzarella.",
      "Rebus dalam air mendidih hingga bakso mengapung.",
      "Sajikan dengan kuah kaldu dan mie.",
    ],
  },
  {
    id: "premium-7",
    nama: "Opor Ayam Lebaran",
    kategori: "Makanan Berat",
    waktuMasak: "60 menit",
    porsi: 10,
    harga: 25000,
    emoji: "🍛",
    deskripsi: "Opor ayam klasik khas lebaran dengan santan gurih dan bumbu rempah yang kaya. Wajib ada di meja makan.",
    bahan: [
      "1 ekor ayam kampung",
      "600 ml santan kental",
      "kemiri, ketumbar, kunyit",
      "bawang merah dan putih",
      "serai, daun salam, daun jeruk",
      "gula merah, garam",
    ],
    langkah: [
      "Haluskan bumbu: kemiri, ketumbar, kunyit, bawang.",
      "Tumis bumbu hingga matang dan wangi.",
      "Masukkan ayam, aduk rata dengan bumbu.",
      "Tambahkan santan encer, serai, dan daun-daun.",
      "Masak hingga ayam empuk.",
      "Tuang santan kental, masak sambil diaduk.",
      "Sajikan dengan ketupat dan sambal goreng.",
    ],
  },
  {
    id: "premium-8",
    nama: "Rawon Daging Sapi Khas Jawa Timur",
    kategori: "Makanan Berat",
    waktuMasak: "90 menit",
    porsi: 6,
    harga: 28000,
    emoji: "🍖",
    deskripsi: "Rawon hitam pekat khas Jawa Timur dengan bumbu kluwek asli. Kuah gelap penuh cita rasa.",
    bahan: [
      "500 gram daging sapi",
      "5 buah kluwek (diambil isinya)",
      "bawang merah, bawang putih",
      "lengkuas, jahe, serai",
      "daun salam, daun jeruk",
      "garam, gula merah",
    ],
    langkah: [
      "Rebus daging hingga empuk, simpan kaldu.",
      "Haluskan kluwek bersama semua bumbu.",
      "Tumis bumbu kluwek hingga matang dan harum.",
      "Masukkan kaldu daging ke dalam bumbu.",
      "Tambahkan potongan daging, masak hingga mendidih.",
      "Koreksi rasa, sajikan dengan taoge, telur asin, dan sambal.",
    ],
  },
  {
    id: "premium-9",
    nama: "Garang Asem Ayam Daun Pisang",
    kategori: "Makanan Berat",
    waktuMasak: "60 menit",
    porsi: 4,
    harga: 20000,
    emoji: "🌿",
    deskripsi: "Garang asem ayam dibungkus daun pisang dengan kuah segar asam-pedas. Khas Jawa Tengah.",
    bahan: [
      "1 ekor ayam potong",
      "tomat hijau dan merah",
      "belimbing wuluh",
      "cabai hijau dan merah",
      "bawang merah, lengkuas, serai",
      "daun pisang untuk membungkus",
    ],
    langkah: [
      "Campur ayam dengan semua bumbu dan buah asam.",
      "Bungkus dalam daun pisang rapat-rapat.",
      "Kukus selama 45 menit hingga matang.",
      "Bisa juga dibakar setelah dikukus untuk aroma smoky.",
      "Buka bungkusan dan sajikan langsung.",
    ],
  },
  {
    id: "premium-10",
    nama: "Semur Jengkol Spesial",
    kategori: "Makanan Berat",
    waktuMasak: "75 menit",
    porsi: 4,
    harga: 15000,
    emoji: "🫘",
    deskripsi: "Semur jengkol empuk tanpa bau menyengat dengan bumbu kecap yang meresap sempurna.",
    bahan: [
      "500 gram jengkol",
      "5 sdm kecap manis",
      "bawang merah, bawang putih",
      "kemiri, pala, cengkeh",
      "tomat, cabai",
      "gula merah dan garam",
    ],
    langkah: [
      "Rebus jengkol beberapa kali hingga benar-benar empuk dan bau berkurang.",
      "Geprek jengkol agar bumbu mudah meresap.",
      "Haluskan bumbu dan tumis hingga harum.",
      "Masukkan jengkol, aduk rata dengan bumbu.",
      "Tambahkan kecap manis dan air, masak hingga mengental.",
      "Sajikan dengan nasi hangat.",
    ],
  },
];

// =============================================
// PROVIDER — membungkus seluruh aplikasi
// =============================================
export function ResepProvider({ children }) {
  // Daftar resep milik sendiri (gratis)
  const [daftarResep, setDaftarResep] = useState(dataResepAwal);

  // Daftar ID resep premium yang sudah dibeli
  const [resepDibeli, setResepDibeli] = useState([]);

  // Fungsi tambah resep baru (input manual)
  function tambahResep(resepBaru) {
    const idBaru = "resep-" + Date.now();
    setDaftarResep((prev) => [...prev, { ...resepBaru, id: idBaru }]);
  }

  // Fungsi hapus resep
  function hapusResep(id) {
    setDaftarResep((prev) => prev.filter((r) => r.id !== id));
  }

  // Fungsi setelah berhasil membeli resep premium
  // → tandai sebagai dibeli, lalu masukkan ke daftar resep sendiri
  function beliResepPremium(resepPremium) {
    // Cegah duplikasi jika sudah pernah dibeli
    if (resepDibeli.includes(resepPremium.id)) return;

    setResepDibeli((prev) => [...prev, resepPremium.id]);

    // Tambahkan ke daftar resep sendiri
    setDaftarResep((prev) => [
      ...prev,
      {
        ...resepPremium,
        // Beri flag agar bisa dibedakan di tampilan
        isPremium: true,
      },
    ]);
  }

  return (
    <ResepContext.Provider
      value={{
        daftarResep,
        tambahResep,
        hapusResep,
        daftarResepPremium: dataResepPremium,
        resepDibeli,
        beliResepPremium,
      }}
    >
      {children}
    </ResepContext.Provider>
  );
}

// Hook ini kita export agar bisa dipakai di halaman lain
export function gunakanResep() {
  return useContext(ResepContext);
}

// =============================================
// NAVBAR
// =============================================
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

// =============================================
// APP — komponen utama
// =============================================
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
