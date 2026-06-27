// =============================================
// UTILITAS GEMINI AI — Google Generative AI
// =============================================
// Menggunakan Gemini Free Tier dari Google AI Studio
// Jika quota habis, otomatis pakai sistem fallback cerdas

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const DAFTAR_MODEL = [
  { nama: "gemini-1.5-flash-8b",     versi: "v1beta" },
  { nama: "gemini-1.5-flash",        versi: "v1beta" },
  { nama: "gemini-2.0-flash-lite",   versi: "v1beta" },
  { nama: "gemini-2.0-flash",        versi: "v1beta" },
];

async function panggilSatuModel({ nama, versi }, semuaPesan) {
  const url = `https://generativelanguage.googleapis.com/${versi}/models/${nama}:generateContent`;
  const respons = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: semuaPesan,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });
  const statusHttp = respons.status;
  const bodyTeks = await respons.text();
  return { statusHttp, bodyTeks, ok: respons.ok };
}

/**
 * Mengirim pertanyaan ke Gemini AI.
 * Jika API gagal (quota habis, dll), otomatis pakai fallback cerdas.
 */
export async function tanyaGemini(sistemPrompt, riwayatChat = [], pesanBaru) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "GANTI_DENGAN_GEMINI_API_KEY_ANDA") {
    throw new Error("API_KEY_BELUM_DIISI");
  }

  const semuaPesan = [
    { role: "user",  parts: [{ text: sistemPrompt }] },
    { role: "model", parts: [{ text: "Siap! Saya siap membantu Anda. 😊" }] },
    ...riwayatChat.map((c) => ({
      role: c.pengirim === "pengguna" ? "user" : "model",
      parts: [{ text: c.pesan }],
    })),
    { role: "user", parts: [{ text: pesanBaru }] },
  ];

  // Coba semua model Gemini dulu
  for (const model of DAFTAR_MODEL) {
    try {
      console.log(`[Gemini] Mencoba model: ${model.nama}...`);
      const { statusHttp, bodyTeks, ok } = await panggilSatuModel(model, semuaPesan);

      if (ok) {
        const data = JSON.parse(bodyTeks);
        const teks = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (teks) {
          console.log(`[Gemini] ✅ Berhasil: ${model.nama}`);
          return teks;
        }
      }

      console.warn(`[Gemini] ❌ ${model.nama} gagal (${statusHttp})`);
      if (statusHttp !== 404 && statusHttp !== 429) break;

    } catch (err) {
      console.warn(`[Gemini] Error ${model.nama}:`, err.message);
    }
  }

  // Gemini gagal semua → pakai fallback cerdas
  console.log("[Gemini] Beralih ke mode fallback cerdas...");
  return jawabanFallbackCerdas(sistemPrompt, pesanBaru);
}

// =============================================
// SISTEM FALLBACK CERDAS
// Menganalisis pertanyaan dan konteks resep,
// lalu memberikan jawaban yang relevan
// =============================================
function jawabanFallbackCerdas(sistemPrompt, pertanyaan) {
  const tanya = pertanyaan.toLowerCase();

  // Ekstrak nama resep dari sistem prompt
  const namaResepMatch = sistemPrompt.match(/NAMA RESEP:\s*(.+)/);
  const namaResep = namaResepMatch ? namaResepMatch[1].trim() : "resep ini";

  // Ekstrak bahan-bahan dari sistem prompt
  const bahanMatch = sistemPrompt.match(/BAHAN-BAHAN:\n([\s\S]+?)\n\n/);
  const daftarBahan = bahanMatch ? bahanMatch[1] : "";

  // Ekstrak jumlah porsi
  const porsiMatch = sistemPrompt.match(/PORSI:\s*(\d+)/);
  const porsiAwal = porsiMatch ? parseInt(porsiMatch[1]) : 2;

  // ===========================================
  // 1. PERTANYAAN SUBSTITUSI BAHAN
  // ===========================================
  if (tanya.includes("ganti") || tanya.includes("diganti") || tanya.includes("pengganti") || tanya.includes("alternatif") || tanya.includes("tidak punya") || tanya.includes("ga punya") || tanya.includes("nggak ada")) {

    // Deteksi bahan spesifik
    if (tanya.includes("kecap manis")) {
      return `🍯 **Pengganti Kecap Manis**\n\nBeberapa alternatif yang bisa kamu pakai:\n\n1. **Kecap asin + gula** — Campurkan 2 sdm kecap asin dengan 1 sdm gula pasir/merah. Aduk hingga gula larut. Hasil rasanya sangat mirip!\n2. **Madu + kecap asin** — Campurkan 1 sdm madu dengan 1 sdm kecap asin untuk rasa manis-gurih yang seimbang.\n3. **Air rendaman kismis** — Rendam kismis dalam air panas, haluskan, campur dengan sedikit kecap asin.\n4. **Gula kelapa + air** — Larutkan 1 sdm gula kelapa dalam 1 sdm air panas, tambahkan sedikit garam.\n\n💡 **Tips:** Untuk ${namaResep}, pilihan terbaik adalah campuran kecap asin + gula karena tekstur dan warnanya paling mendekati kecap manis asli! Perbandingannya 2:1 (kecap asin:gula). 🍳`;
    }

    if (tanya.includes("santan")) {
      return `🥥 **Pengganti Santan**\n\nBerikut alternatif yang bisa digunakan untuk ${namaResep}:\n\n1. **Susu full cream** — Bisa menggantikan 1:1. Tambahkan sedikit minyak kelapa untuk aroma.\n2. **Susu kedelai plain** — Pilihan yang lebih sehat, rasa sedikit berbeda tapi tetap creamy.\n3. **Susu evaporasi** — Teksturnya lebih kental, cocok untuk masakan berkuah.\n4. **Plain yogurt (diencerkan)** — Campurkan 3 sdm yogurt dengan 100ml air, hasilkan rasa sedikit asam yang unik.\n\n💡 **Tips:** Jika pakai susu, jangan masak terlalu lama agar tidak pecah. Masukkan di akhir proses memasak ya! 🍳`;
    }

    if (tanya.includes("bawang putih") || tanya.includes("bawang bombay")) {
      return `🧄 **Pengganti Bawang Putih/Bombay**\n\nAlternatif yang bisa digunakan:\n\n1. **Bawang putih bubuk** — 1 siung = ¼ sdt bawang putih bubuk\n2. **Bawang merah** — Rasa sedikit lebih manis, tambahkan sedikit lebih banyak\n3. **Daun bawang (bagian putihnya)** — Aroma mirip, cocok untuk oseng-oseng\n4. **Bawang goreng siap pakai** — Tambahkan di akhir agar aroma tetap kuat\n\n💡 **Tips:** Untuk ${namaResep}, bawang goreng siap pakai bisa jadi shortcut yang praktis! Tambahkan 1 sdm di akhir masakan. 😊`;
    }

    if (tanya.includes("telur")) {
      return `🥚 **Pengganti Telur dalam Masakan**\n\nTergantung fungsi telur di resep:\n\n**Sebagai bahan masak (orak-arik, dadar):**\n1. **Tahu sutra yang dihaluskan** — Tekstur sangat mirip telur orak-arik\n2. **Tempe yang dihaluskan** — Rasa gurih dan bergizi\n\n**Sebagai pengikat adonan:**\n1. **1 sdm tepung maizena + 3 sdm air** — Setara 1 butir telur\n2. **3 sdm aquafaba (air rebusan kacang)** — Setara 1 butir telur\n\n💡 **Tips:** Untuk ${namaResep}, lihat peran telur di resepnya ya. Kalau sebagai lauk utama, tahu sutra paling mendekati! 🍳`;
    }

    if (tanya.includes("gula") || tanya.includes("gula pasir")) {
      return `🍬 **Pengganti Gula**\n\nAlternatif manis yang bisa digunakan:\n\n1. **Gula kelapa/palm sugar** — Rasa lebih kaya dengan sedikit aroma karamel, rasio 1:1\n2. **Madu** — Lebih manis, gunakan ¾ dari takaran gula. Jangan dimasak terlalu panas.\n3. **Gula merah** — Tambahkan aroma khas, cocok untuk masakan Indonesia\n4. **Kecap manis** — Bisa menambah rasa manis sekaligus warna untuk masakan tertentu\n\n💡 **Tips:** Untuk ${namaResep}, gula kelapa atau gula merah sangat cocok karena menambah cita rasa khas masakan Indonesia! 😊`;
    }

    // Default substitusi
    return `🔄 **Pertanyaan Substitusi Bahan**\n\nUntuk mengganti bahan dalam **${namaResep}**, prinsip dasarnya:\n\n1. **Cari yang memiliki fungsi serupa** — rasa, tekstur, atau peran dalam masakan\n2. **Sesuaikan takaran** — bahan pengganti mungkin lebih/kurang kuat\n3. **Coba dahulu sedikit** — sebelum dimasak semua\n\n🥘 **Bahan-bahan di resep ini yang sering bisa disubstitusi:**\n${daftarBahan.split("\n").slice(0, 4).map(b => `• ${b.replace(/^\d+\.\s*/, "")} → cek alternatifnya di Google`).join("\n")}\n\n💡 **Tips:** Sebutkan bahan spesifik yang ingin diganti, dan saya akan berikan rekomendasi yang lebih tepat! 😊`;
  }

  // ===========================================
  // 2. PERTANYAAN PERHITUNGAN PORSI
  // ===========================================
  const porsiBaruMatch = tanya.match(/(\d+)\s*(?:porsi|orang|pax)/);
  if (porsiBaruMatch && (tanya.includes("porsi") || tanya.includes("orang") || tanya.includes("hitung") || tanya.includes("kalau") || tanya.includes("untuk"))) {
    const porsiTujuan = parseInt(porsiBaruMatch[1]);
    const rasio = porsiTujuan / porsiAwal;

    // Ambil bahan dari sistem prompt
    const bahanLines = daftarBahan.split("\n").filter(b => b.trim());

    const bahanDisesuaikan = bahanLines.map(bahan => {
      // Cari angka dalam bahan
      const angkaBahan = bahan.match(/(\d+(?:[,.]\d+)?)\s*(gram|gr|kg|ml|liter|L|sdm|sdt|siung|buah|butir|lembar|ikat|batang|cup|gelas|piring)/i);
      if (angkaBahan) {
        const jumlahBaru = (parseFloat(angkaBahan[1].replace(",", ".")) * rasio).toFixed(1).replace(".0", "");
        return bahan.replace(/^\d+\.\s*/, "• ").replace(angkaBahan[0], `${jumlahBaru} ${angkaBahan[2]}`);
      }
      return `• ${bahan.replace(/^\d+\.\s*/, "")}`;
    }).slice(0, 8).join("\n");

    return `⚖️ **Penyesuaian Porsi: ${porsiAwal} → ${porsiTujuan} Porsi**\n\nResep asli untuk **${porsiAwal} porsi**. Berikut takaran yang sudah disesuaikan untuk **${porsiTujuan} porsi** (×${rasio % 1 === 0 ? rasio : rasio.toFixed(1)}):\n\n${bahanDisesuaikan}\n\n💡 **Tips Memasak:**\n• Waktu memasak mungkin perlu ditambah sedikit jika porsi lebih besar\n• Bumbu bisa disesuaikan sesuai selera (tidak harus persis ×${rasio.toFixed(1)})\n• Untuk porsi besar, pastikan wajan/panci cukup besar agar masakan matang merata\n\n✅ Semoga ${namaResep} untuk ${porsiTujuan} orang berhasil ya! 😊🍽️`;
  }

  // ===========================================
  // 3. PERTANYAAN VEGETARIAN/MODIFIKASI DIET
  // ===========================================
  if (tanya.includes("vegetarian") || tanya.includes("vegan") || tanya.includes("tanpa daging") || tanya.includes("nabati")) {
    return `🌿 **Modifikasi Vegetarian untuk ${namaResep}**\n\nBerikut cara mengubahnya menjadi versi vegetarian:\n\n**Ganti protein hewani dengan:**\n• 🍄 **Jamur tiram/shiitake** — Tekstur kenyal mirip daging, rasa umami kuat\n• 🧈 **Tempe** — Kaya protein, bisa digoreng/dikukus terlebih dahulu\n• 🫘 **Tahu keras** — Potong tebal, goreng sampai keemasan sebelum diolah\n• 🥜 **Kacang merah/chickpea** — Untuk variasi yang lebih bergizi\n\n**Ganti kaldu ayam/sapi dengan:**\n• Kaldu sayuran (beli di supermarket atau buat sendiri)\n• Air rebusan jamur (umami alami!)\n\n**Ganti kecap asin ikan dengan:**\n• Kecap asin biasa + sedikit rumput laut untuk rasa laut\n\n💡 **Tips:** Tambahkan sedikit lebih banyak bumbu untuk mengkompensasi hilangnya rasa gurih dari daging. Selamat bereksperimen! 🥗`;
  }

  // ===========================================
  // 4. PERTANYAAN TIPS MEMASAK
  // ===========================================
  if (tanya.includes("tips") || tanya.includes("cara") || tanya.includes("agar") || tanya.includes("supaya") || tanya.includes("biar")) {
    return `💡 **Tips Memasak ${namaResep}**\n\nBerikut beberapa tips agar hasilnya lebih sempurna:\n\n1. **Persiapkan bahan lebih dulu (mise en place)** — Potong dan siapkan semua bahan sebelum mulai memasak. Ini mencegah gosong karena tergesa-gesa!\n\n2. **Api yang tepat** — Mulai dengan api sedang. Jangan langsung api besar agar bumbu matang merata dan tidak pahit.\n\n3. **Tumis bumbu sampai harum** — Bawang dan rempah perlu ditumis hingga benar-benar harum (3-5 menit) sebelum bahan lain masuk. Ini kunci rasa!\n\n4. **Koreksi rasa di akhir** — Tambahkan garam/gula/penyedap setelah masakan hampir matang. Rasa bisa berubah saat memasak.\n\n5. **Istirahatkan sebelum disajikan** — Biarkan masakan 2-3 menit setelah matang agar rasa meresap sempurna.\n\n✨ Dengan tips ini, ${namaResep} kamu pasti lebih lezat! 👨‍🍳`;
  }

  // ===========================================
  // 5. PERTANYAAN PENYIMPANAN
  // ===========================================
  if (tanya.includes("simpan") || tanya.includes("tahan") || tanya.includes("kulkas") || tanya.includes("beku") || tanya.includes("sisa")) {
    return `🧊 **Cara Menyimpan ${namaResep}**\n\n**Di suhu ruang:**\n• Maksimal 2-4 jam (di iklim tropis Indonesia)\n• Tutup rapat agar tidak terkontaminasi\n\n**Di lemari es (kulkas):**\n• Tahan 2-3 hari dalam wadah tertutup rapat\n• Panaskan kembali dengan api kecil, tambahkan sedikit air jika terlalu kental\n\n**Di freezer:**\n• Bisa tahan 1-3 bulan\n• Simpan dalam porsi kecil agar mudah diambil\n• Cairkan di kulkas semalaman sebelum dipanaskan\n\n💡 **Tips:** Jangan simpan masakan yang sudah diambil sendok yang sama berulang kali — gunakan sendok bersih tiap mengambil untuk menghindari kontaminasi bakteri! 😊`;
  }

  // ===========================================
  // DEFAULT — Pertanyaan Umum
  // ===========================================
  return `👨‍🍳 **Pertanyaan tentang ${namaResep}**\n\nTerima kasih sudah bertanya! Berikut yang bisa saya bantu terkait resep ini:\n\n🔄 **Substitusi bahan** — Tanya "Bahan X bisa diganti dengan apa?"\n⚖️ **Hitung porsi** — Tanya "Kalau untuk 5 orang, berapa takarannya?"\n🌿 **Modifikasi diet** — Tanya "Bagaimana versi vegetariannya?"\n💡 **Tips memasak** — Tanya "Tips agar hasilnya lebih enak?"\n🧊 **Penyimpanan** — Tanya "Bisa disimpan berapa lama?"\n\n**Pertanyaan kamu:** "${pertanyaan}"\n\n${buatJawabanKontekstual(namaResep, daftarBahan, tanya)}`;
}

function buatJawabanKontekstual(namaResep, daftarBahan, pertanyaan) {
  const bahan = daftarBahan.split("\n").slice(0, 3).map(b => b.replace(/^\d+\.\s*/, "")).filter(Boolean);
  if (bahan.length === 0) return "Coba tanya lebih spesifik ya, saya siap membantu! 😊";

  return `Untuk resep **${namaResep}** yang menggunakan ${bahan.slice(0, 2).join(", ")}, saya sarankan kamu coba tanyakan secara lebih spesifik — misalnya menyebut nama bahan yang ingin diganti atau jumlah porsi yang diinginkan. Saya akan langsung berikan jawaban yang detail! 😊`;
}

export function buatPromptSousChef(resep) {
  return `Kamu adalah "Si Sous-Chef", asisten memasak AI dari website "Dapur Holut Yudawan".

📋 NAMA RESEP: ${resep.nama}
🏷️ KATEGORI: ${resep.kategori}
⏱️ WAKTU MEMASAK: ${resep.waktuMasak}
🍽️ PORSI: ${resep.porsi} porsi

🥘 BAHAN-BAHAN:
${resep.bahan.map((b, i) => `${i + 1}. ${b}`).join("\n")}

📝 LANGKAH MEMASAK:
${resep.langkah.map((l, i) => `${i + 1}. ${l}`).join("\n")}

TUGASMU: Bantu substitusi bahan, hitung ulang porsi, sarankan modifikasi resep, dan berikan tips memasak. Jawab dalam Bahasa Indonesia yang ramah dengan emoji yang menarik.`;
}

export function buatPromptInspekturKulkas(semuaResep) {
  const daftarResepSingkat = semuaResep
    .map((r) => `- ${r.emoji} ${r.nama} (Bahan utama: ${r.bahan.slice(0, 3).join(", ")})`)
    .join("\n");

  return `Kamu adalah "Inspektur Kulkas", asisten AI dari website "Dapur Holut Yudawan".

📚 DATABASE RESEP:
${daftarResepSingkat}

TUGASMU: Analisis bahan yang dimiliki pengguna, cocokkan dengan resep di database, dan rekomendasikan 1-3 resep yang paling sesuai. Jawab dalam Bahasa Indonesia yang ramah dan antusias dengan emoji yang menarik.`;
}
