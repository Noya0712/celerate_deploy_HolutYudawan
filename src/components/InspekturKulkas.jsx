import { useState } from "react";
import { Link } from "react-router-dom";
import { tanyaGemini, buatPromptInspekturKulkas } from "../utils/gemini";

// ============================================================
// KOMPONEN INSPEKTUR KULKAS — Rekomendasi Resep dari AI
// Berdasarkan bahan-bahan yang dimiliki pengguna
// ============================================================
export default function InspekturKulkas({ semuaResep }) {
  // Input bahan dari pengguna
  const [inputBahan, setInputBahan] = useState("");

  // Daftar bahan yang sudah ditambahkan (sebagai tag/chip)
  const [daftarBahan, setDaftarBahan] = useState([]);

  // Hasil rekomendasi dari AI
  const [hasilRekomendasi, setHasilRekomendasi] = useState("");

  // Status loading
  const [sedangMencari, setSedangMencari] = useState(false);

  // Tambahkan bahan ke daftar
  function tambahBahan() {
    const bahan = inputBahan.trim();
    if (!bahan) return;

    // Pisahkan jika ada koma (misal: "telur, bawang, cabai")
    const bahanBaru = bahan
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b && !daftarBahan.includes(b.toLowerCase()));

    setDaftarBahan((prev) => [...prev, ...bahanBaru.map((b) => b.toLowerCase())]);
    setInputBahan("");
  }

  // Hapus bahan dari daftar
  function hapusBahan(bahan) {
    setDaftarBahan((prev) => prev.filter((b) => b !== bahan));
  }

  // Tambah bahan dengan Enter
  function handleKeyboard(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      tambahBahan();
    }
  }

  // Tanya AI untuk rekomendasi resep
  async function handleCekResep() {
    if (daftarBahan.length === 0) return;

    setSedangMencari(true);
    setHasilRekomendasi("");

    try {
      const sistemPrompt = buatPromptInspekturKulkas(semuaResep);
      const pertanyaan = `Bahan-bahan yang saya punya di dapur saat ini: ${daftarBahan.join(", ")}.\n\nResep apa yang bisa saya buat dari website ini?`;

      const jawaban = await tanyaGemini(sistemPrompt, [], pertanyaan);
      setHasilRekomendasi(jawaban);
    } catch (error) {
      if (error.message === "API_KEY_BELUM_DIISI") {
        setHasilRekomendasi(
          "⚠️ API Key Gemini belum diisi!\n\nCaranya:\n1. Buka file .env\n2. Isi VITE_GEMINI_API_KEY dengan key dari https://aistudio.google.com/app/apikey\n3. Restart server (npm run dev)"
        );
      } else {
        setHasilRekomendasi("😔 Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setSedangMencari(false);
    }
  }

  // Reset semua
  function handleReset() {
    setDaftarBahan([]);
    setHasilRekomendasi("");
    setInputBahan("");
  }

  // Format teks jawaban AI menjadi paragraf dan bold
  function renderJawabanAI(teks) {
    return teks.split("\n").map((baris, i) => {
      if (!baris.trim()) return <br key={i} />;

      // Bold teks yang ada di antara **
      const bagian = baris.split("**");
      return (
        <p key={i} className="mb-1">
          {bagian.map((b, j) =>
            j % 2 === 1 ? <strong key={j}>{b}</strong> : b
          )}
        </p>
      );
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden mt-10">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            🔍
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">Inspektur Kulkas</h2>
            <p className="text-blue-100 text-sm">
              Punya bahan apa? Biar AI carikan resepnya untuk kamu!
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium">AI Aktif</span>
          </div>
        </div>
      </div>

      {/* ===== FORM INPUT BAHAN ===== */}
      <div className="p-6">

        {/* Input tambah bahan */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputBahan}
            onChange={(e) => setInputBahan(e.target.value)}
            onKeyDown={handleKeyboard}
            placeholder="Ketik bahan (misal: telur, bawang, cabai) lalu Enter"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition"
          />
          <button
            onClick={tambahBahan}
            disabled={!inputBahan.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition flex items-center gap-1"
          >
            + Tambah
          </button>
        </div>

        {/* Tag/chip bahan yang sudah ditambahkan */}
        {daftarBahan.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-blue-50 rounded-xl min-h-[48px]">
            {daftarBahan.map((bahan, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded-full shadow-sm"
              >
                🥕 {bahan}
                <button
                  onClick={() => hapusBahan(bahan)}
                  className="text-blue-300 hover:text-red-500 transition ml-1 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Placeholder jika belum ada bahan */}
        {daftarBahan.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-sm w-full text-center">
              🧺 Bahan-bahan kamu akan muncul di sini...
            </p>
            {/* Contoh bahan yang bisa diklik */}
            <div className="w-full flex flex-wrap gap-2 justify-center mt-2">
              {["telur", "bawang putih", "cabai rawit", "nasi", "ayam"].map((contoh) => (
                <button
                  key={contoh}
                  onClick={() => {
                    setDaftarBahan((prev) =>
                      prev.includes(contoh) ? prev : [...prev, contoh]
                    );
                  }}
                  className="bg-white border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full hover:border-blue-300 hover:text-blue-600 transition"
                >
                  + {contoh}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Cek Resep */}
        <div className="flex gap-2">
          <button
            onClick={handleCekResep}
            disabled={daftarBahan.length === 0 || sedangMencari}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-200 disabled:to-gray-200 text-white disabled:text-gray-400 font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {sedangMencari ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                AI sedang menganalisis...
              </>
            ) : (
              <>🔍 Cek Resep dari Bahan Ini!</>
            )}
          </button>

          {(daftarBahan.length > 0 || hasilRekomendasi) && (
            <button
              onClick={handleReset}
              className="border border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400 rounded-xl px-4 py-3 transition text-sm"
            >
              Reset
            </button>
          )}
        </div>

        {/* ===== HASIL REKOMENDASI AI ===== */}
        {hasilRekomendasi && (
          <div className="mt-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
            {/* Header hasil */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-blue-200">
              <span className="text-xl">🤖</span>
              <p className="font-bold text-blue-700 text-sm">Rekomendasi dari Inspektur Kulkas</p>
            </div>

            {/* Teks jawaban AI */}
            <div className="text-sm text-gray-700 leading-relaxed">
              {renderJawabanAI(hasilRekomendasi)}
            </div>

            {/* Tombol shortcut ke halaman resep */}
            <div className="mt-4 pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-500 font-medium mb-2">
                Shortcut ke daftar resep:
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/resep"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                >
                  📚 Lihat Semua Resep →
                </Link>
                <button
                  onClick={handleReset}
                  className="bg-white border border-blue-200 hover:border-blue-400 text-blue-600 text-xs px-3 py-1.5 rounded-lg transition font-medium"
                >
                  🔄 Coba Bahan Lain
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer kecil */}
        <p className="text-center text-xs text-gray-300 mt-4">
          ✨ Bertenaga Gemini 1.5 Flash · Gratis digunakan
        </p>
      </div>
    </div>
  );
}
