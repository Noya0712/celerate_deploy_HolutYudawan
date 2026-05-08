# Dapur Holut Yudawan

Aplikasi manajemen resep masakan Indonesia berbasis React dengan React Router v6 (Data APIs) dan State Management menggunakan Context API

---

## Deskripsi Project

Dapur Holut Yudawan adalah aplikasi web interaktif yang memungkinkan pengguna untuk mengelola koleksi resep masakan pribadi. Aplikasi ini mendemonstrasikan implementasi navigasi sisi klien (client-side routing) yang kompleks dan pengelolaan state global tanpa library pihak ketiga tambahan.
Aplikasi ini memenuhi kriteria tugas Frontend Routing dan State Management pada modul Frontend Development

---

## Penjelasan Routing

Aplikasi ini menggunakan createBrowserRouter untuk mendefinisikan rute secara terpusat dengan App.jsx sebagai Layout utama.

1. http://localhost:5173/

Halaman Beranda (Statis)
Halaman utama yang berfungsi sebagai landing page. Menampilkan statistik jumlah resep secara real-time dan cuplikan resep pilihan.

2. http://localhost:5173/resep

Halaman Daftar Resep (Statis + State Management)
Pusat pengelolaan data. Di halaman ini, state global digunakan untuk:

    Menampilkan seluruh list resep yang tersimpan.
    Menambahkan data resep baru ke dalam state.
    Menghapus resep secara permanen dari daftar.

3. http://localhost:5173/resep/:id ← (Dynamic Route)

Halaman Detail Resep (Dinamis)
Menggunakan rute dinamis untuk menampilkan informasi spesifik (Bahan & Langkah) berdasarkan parameter ID di URL. Data difilter secara otomatis dari state utama berdasarkan ID yang dituju.

4. http://localhost:5173/tentang

Halaman Tentang (Statis)
Informasi mengenai tujuan pembuatan aplikasi, daftar fitur, dan tumpukan teknologi (tech stack) yang digunakan.

5. http://localhost:5173/*

Halaman Tidak Ditemukan / 404 (Statis)
Halaman peringatan otomatis yang muncul jika pengguna mencoba mengakses alamat URL yang tidak terdaftar dalam konfigurasi rute.


## Cara Menjalankan

Clone atau Unduh repositori ini
Buka Terminal di dalam folder proyek

```bash
# 1. Install dependensi
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka di browser
# http://localhost:5173
```

---

## Struktur File

Celerate_Holut_Yudawan/
├── src/
│   ├── app/
│   │   └── router.jsx          # Konfigurasi rute utama
│   ├── pages/                  # Komponen halaman terpisah
│   │   ├── HalamanBeranda.jsx
│   │   ├── HalamanDaftarResep.jsx
│   │   ├── HalamanDetailResep.jsx
│   │   ├── HalamanTentang.jsx
│   │   └── HalamanTidakDitemukan.jsx
│   ├── App.jsx                 # Layout Utama + Context Provider + Navbar
│   ├── main.jsx                # Entry point (Render RouterProvider)
│   └── index.css               # Konfigurasi Tailwind
├── tailwind.config.js
└── package.json
