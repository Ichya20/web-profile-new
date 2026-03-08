import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Memanggil koneksi database yang tadi kita buat
import { Link } from 'react-router-dom';

const AdminJournal: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // State untuk menyimpan ketikan di form
  const [formData, setFormData] = useState({
    mingguKe: '',
    tanggal: '',
    // Aktivitas
    fokusSenin: '', outputSenin: '', durasiSenin: '',
    fokusSelasa: '', outputSelasa: '', durasiSelasa: '',
    fokusRabu: '', outputRabu: '', durasiRabu: '',
    fokusKamis: '', outputKamis: '', durasiKamis: '',
    fokusJumat: '', outputJumat: '', durasiJumat: '',
    // Lainnya
    capaian: '', // Akan dipisah per baris
    targetSemester: '', progressPersen: '', progressKet: '',
    kendalaAkademik: '', kendalaTeknis: '', kendalaPribadi: '',
    evalTerbaik: '', evalKesalahan: '', evalStrategi: '',
    rencana: '' // Akan dipisah per baris
  });

  // Fungsi untuk menangani perubahan ketikan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menyimpan data ke Firebase saat tombol diklik
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Menyusun data agar formatnya persis dengan yang dibutuhkan web blog
      const dataToSave = {
        mingguKe: Number(formData.mingguKe),
        tanggal: formData.tanggal,
        aktivitas: [
          { hari: "Senin", fokus: formData.fokusSenin || "-", output: formData.outputSenin || "-", durasi: formData.durasiSenin || "-" },
          { hari: "Selasa", fokus: formData.fokusSelasa || "-", output: formData.outputSelasa || "-", durasi: formData.durasiSelasa || "-" },
          { hari: "Rabu", fokus: formData.fokusRabu || "-", output: formData.outputRabu || "-", durasi: formData.durasiRabu || "-" },
          { hari: "Kamis", fokus: formData.fokusKamis || "-", output: formData.outputKamis || "-", durasi: formData.durasiKamis || "-" },
          { hari: "Jumat", fokus: formData.fokusJumat || "-", output: formData.outputJumat || "-", durasi: formData.durasiJumat || "-" },
        ],
        capaian: formData.capaian.split('\n').filter(item => item.trim() !== ''),
        progress: {
          target: formData.targetSemester,
          persentase: Number(formData.progressPersen),
          keterangan: formData.progressKet
        },
        kendala: {
          akademik: formData.kendalaAkademik,
          teknis: formData.kendalaTeknis,
          pribadi: formData.kendalaPribadi
        },
        evaluasi: {
          terbaik: formData.evalTerbaik,
          kesalahan: formData.evalKesalahan,
          strategi: formData.evalStrategi
        },
        rencana: formData.rencana.split('\n').filter(item => item.trim() !== ''),
        createdAt: new Date() // Menyimpan waktu pembuatan
      };

      // Perintah sakti untuk mengirim ke Firestore (ke tabel "jurnal")
      await addDoc(collection(db, "jurnal"), dataToSave);
      
      alert("✅ Mantap! Jurnal minggu ini berhasil disimpan ke Database!");
      // Reset form (opsional, bisa ditambahkan nanti)
      
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("❌ Gagal menyimpan data. Cek console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-blue-500">ADMIN JURNAL</h1>
          <Link to="/blog" className="text-slate-400 hover:text-white underline">Ke Halaman Blog</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          
          {/* Info Dasar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Minggu Ke-</label>
              <input type="number" name="mingguKe" onChange={handleChange} required className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white" placeholder="Contoh: 1" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Tanggal</label>
              <input type="text" name="tanggal" onChange={handleChange} required className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white" placeholder="Contoh: 2 - 8 Maret 2026" />
            </div>
          </div>

{/* Aktivitas Lengkap Senin - Jumat */}
          <div>
            <h3 className="font-bold text-blue-400 mb-4 border-b border-white/10 pb-2">1. Aktivitas Mingguan</h3>
            
            <div className="space-y-3">
              {/* Senin */}
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="fokusSenin" onChange={handleChange} placeholder="Senin: Fokus" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="text" name="outputSenin" onChange={handleChange} placeholder="Output" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="number" name="durasiSenin" onChange={handleChange} placeholder="Jam" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
              </div>
              
              {/* Selasa */}
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="fokusSelasa" onChange={handleChange} placeholder="Selasa: Fokus" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="text" name="outputSelasa" onChange={handleChange} placeholder="Output" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="number" name="durasiSelasa" onChange={handleChange} placeholder="Jam" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
              </div>

              {/* Rabu */}
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="fokusRabu" onChange={handleChange} placeholder="Rabu: Fokus" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="text" name="outputRabu" onChange={handleChange} placeholder="Output" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="number" name="durasiRabu" onChange={handleChange} placeholder="Jam" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
              </div>

              {/* Kamis */}
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="fokusKamis" onChange={handleChange} placeholder="Kamis: Fokus" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="text" name="outputKamis" onChange={handleChange} placeholder="Output" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="number" name="durasiKamis" onChange={handleChange} placeholder="Jam" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
              </div>

              {/* Jumat */}
              <div className="grid grid-cols-3 gap-2">
                <input type="text" name="fokusJumat" onChange={handleChange} placeholder="Jumat: Fokus" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="text" name="outputJumat" onChange={handleChange} placeholder="Output" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
                <input type="number" name="durasiJumat" onChange={handleChange} placeholder="Jam" className="bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white" />
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">*Kosongkan baris hari tersebut jika tidak ada aktivitas.</p>
          </div>

          {/* Capaian */}
          <div>
            <label className="block text-sm font-bold mb-2 text-blue-400">2. Capaian Minggu Ini (Pisahkan dengan Enter)</label>
            <textarea name="capaian" onChange={handleChange} rows={3} className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white" placeholder="- Mempelajari React Router&#10;- Menyambungkan Firebase"></textarea>
          </div>

          {/* Progress */}
          <div>
             <h3 className="font-bold text-blue-400 mb-4 border-b border-white/10 pb-2">3. Progress Semester</h3>
             <div className="space-y-3">
                <input type="text" name="targetSemester" onChange={handleChange} placeholder="Target Semester" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3" />
                <div className="flex gap-4">
                  <input type="number" name="progressPersen" onChange={handleChange} placeholder="Persentase (%)" className="w-1/3 bg-slate-900 border border-white/10 rounded-lg p-3" />
                  <input type="text" name="progressKet" onChange={handleChange} placeholder="Keterangan singkat" className="w-2/3 bg-slate-900 border border-white/10 rounded-lg p-3" />
                </div>
             </div>
          </div>

          {/* 4. Kendala Mingguan */}
          <div>
            <h3 className="font-bold text-blue-400 mb-4 border-b border-white/10 pb-2">4. Kendala Mingguan</h3>
            <div className="space-y-3">
              <input type="text" name="kendalaAkademik" onChange={handleChange} placeholder="Kendala Akademik" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
              <input type="text" name="kendalaTeknis" onChange={handleChange} placeholder="Kendala Teknis" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
              <input type="text" name="kendalaPribadi" onChange={handleChange} placeholder="Kendala Pribadi" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* 5. Evaluasi Diri */}
          <div>
            <h3 className="font-bold text-blue-400 mb-4 border-b border-white/10 pb-2">5. Evaluasi Diri</h3>
            <div className="space-y-3">
              <input type="text" name="evalTerbaik" onChange={handleChange} placeholder="Apa keberhasilan terbaik minggu ini?" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
              <input type="text" name="evalKesalahan" onChange={handleChange} placeholder="Apa kesalahan terbesar?" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
              <input type="text" name="evalStrategi" onChange={handleChange} placeholder="Apa strategi minggu depan?" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* 6. Rencana Minggu Depan */}
          <div>
            <label className="block text-sm font-bold mb-2 text-blue-400 border-b border-white/10 pb-2">6. Rencana Minggu Depan (Pisahkan dengan Enter)</label>
            <textarea name="rencana" onChange={handleChange} rows={3} className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white text-sm mt-4 focus:border-blue-500 outline-none" placeholder="- Target 1&#10;- Target 2&#10;- Target 3"></textarea>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black p-4 rounded-xl transition-colors mt-8"
          >
            {loading ? 'MENYIMPAN DATA...' : 'SIMPAN KE DATABASE'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminJournal;