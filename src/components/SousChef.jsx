import { useState, useRef, useEffect } from "react";
import { tanyaGemini, buatPromptSousChef } from "../utils/gemini";

// ============================================================
// KOMPONEN SI SOUS-CHEF — Asisten AI Memasak
// Muncul sebagai tombol mengambang di pojok kanan bawah
// halaman detail resep
// ============================================================
export default function SousChef({ resep }) {
  // Status tampil/sembunyikan panel chat
  const [panelTerbuka, setPanelTerbuka] = useState(false);

  // Riwayat chat: array of { pengirim: "pengguna"|"ai", pesan: string }
  const [riwayatChat, setRiwayatChat] = useState([
    {
      pengirim: "ai",
      pesan: `Halo! 👨‍🍳 Saya **Si Sous-Chef**, asisten memasak AI kamu!\n\nSaya siap membantu kamu dengan resep **${resep.nama}** ini. Tanya apa saja:\n• 🔄 Substitusi bahan yang tidak ada\n• ⚖️ Mengubah jumlah porsi\n• 🌿 Modifikasi (vegetarian, dll)\n• 💡 Tips & trik memasak`,
    },
  ]);

  // Input pesan dari pengguna
  const [pesanInput, setPesanInput] = useState("");

  // Status loading saat menunggu jawaban AI
  const [sedangMengetik, setSedangMengetik] = useState(false);

  // Ref untuk scroll otomatis ke bawah
  const refBawahChat = useRef(null);

  // Scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    refBawahChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [riwayatChat, sedangMengetik]);

  // Kirim pesan ke Gemini AI
  async function handleKirimPesan() {
    const pesan = pesanInput.trim();
    if (!pesan || sedangMengetik) return;

    // Tambahkan pesan pengguna ke riwayat
    const riwayatBaru = [...riwayatChat, { pengirim: "pengguna", pesan }];
    setRiwayatChat(riwayatBaru);
    setPesanInput("");
    setSedangMengetik(true);

    try {
      // Buat sistem prompt dengan konteks resep
      const sistemPrompt = buatPromptSousChef(resep);

      // Panggil Gemini API (kecualikan pesan selamat datang dari riwayat)
      const riwayatUntukAI = riwayatBaru.filter((_, index) => index > 0);
      const jawabanAI = await tanyaGemini(sistemPrompt, riwayatUntukAI.slice(0, -1), pesan);

      // Tambahkan jawaban AI ke riwayat
      setRiwayatChat((prev) => [...prev, { pengirim: "ai", pesan: jawabanAI }]);
    } catch (error) {
      // Parse format error: "GEMINI_GAGAL:STATUS:BODY"
      let pesanError;
      const pesanRaw = error.message || "";

      if (pesanRaw === "API_KEY_BELUM_DIISI") {
        pesanError = "⚠️ API Key Gemini belum diisi di file .env";
      } else if (pesanRaw.includes("GEMINI_GAGAL:429") || pesanRaw.includes("429")) {
        pesanError = "⚠️ **Quota API habis.**\n\nKamu perlu aktifkan billing di Google Cloud Console untuk project API Key kamu.\n\nBuka: console.cloud.google.com → Billing → Link a billing account";
      } else if (pesanRaw.includes("GEMINI_GAGAL:403") || pesanRaw.includes("403")) {
        pesanError = "🔑 **API Key tidak valid.**\n\nPastikan API Key dari Google AI Studio sudah benar di file .env";
      } else {
        pesanError = `😔 Terjadi kesalahan. Coba refresh halaman dan ulangi.\n\nDetail: ${pesanRaw.slice(0, 100)}`;
      }

      setRiwayatChat((prev) => [...prev, { pengirim: "ai", pesan: pesanError }]);
    } finally {
      setSedangMengetik(false);
    }
  }

  // Kirim pesan dengan Enter (Shift+Enter untuk baris baru)
  function handleTombolKeyboard(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleKirimPesan();
    }
  }

  // Format teks markdown sederhana (bold dengan **)
  function formatTeksPesan(teks) {
    return teks
      .split("**")
      .map((bagian, i) =>
        i % 2 === 1
          ? <strong key={i}>{bagian}</strong>
          : bagian
      );
  }

  return (
    <>
      {/* ===== TOMBOL MENGAMBANG ===== */}
      <button
        onClick={() => setPanelTerbuka(!panelTerbuka)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-bold text-white transition-all ${
          panelTerbuka
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:-translate-y-1"
        }`}
        title="Tanya Si Sous-Chef"
      >
        <span className="text-xl">{panelTerbuka ? "✕" : "👨‍🍳"}</span>
        <span className="text-sm">{panelTerbuka ? "Tutup" : "Si Sous-Chef"}</span>
        {/* Indikator AI aktif */}
        {!panelTerbuka && (
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
        )}
      </button>

      {/* ===== PANEL CHAT ===== */}
      {panelTerbuka && (
        <div className="fixed bottom-20 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden max-h-[500px]">

          {/* Header Panel */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              👨‍🍳
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Si Sous-Chef</p>
              <p className="text-orange-100 text-xs">Asisten AI · Bertenaga Gemini</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-orange-100 text-xs">Online</span>
            </div>
          </div>

          {/* Area Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-orange-50/30">
            {riwayatChat.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.pengirim === "pengguna" ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar AI */}
                {chat.pengirim === "ai" && (
                  <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">
                    👨‍🍳
                  </div>
                )}

                {/* Balon pesan */}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    chat.pengirim === "pengguna"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : "bg-white text-gray-700 rounded-bl-sm shadow-sm border border-orange-100"
                  }`}
                >
                  {chat.pengirim === "ai"
                    ? formatTeksPesan(chat.pesan)
                    : chat.pesan}
                </div>
              </div>
            ))}

            {/* Animasi "AI sedang mengetik..." */}
            {sedangMengetik && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0">
                  👨‍🍳
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Anchor scroll ke bawah */}
            <div ref={refBawahChat} />
          </div>

          {/* Input Pesan */}
          <div className="p-3 border-t border-orange-100 bg-white flex gap-2">
            <textarea
              className="flex-1 border border-orange-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-orange-400 transition"
              placeholder="Tanya tentang resep ini..."
              rows={2}
              value={pesanInput}
              onChange={(e) => setPesanInput(e.target.value)}
              onKeyDown={handleTombolKeyboard}
              disabled={sedangMengetik}
            />
            <button
              onClick={handleKirimPesan}
              disabled={!pesanInput.trim() || sedangMengetik}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 text-white rounded-xl px-3 py-2 transition flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Footer kecil */}
          <p className="text-center text-xs text-gray-300 py-1 bg-white">
            Bertenaga Gemini 1.5 Flash ✨
          </p>
        </div>
      )}
    </>
  );
}
