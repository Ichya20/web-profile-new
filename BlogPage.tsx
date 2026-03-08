import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase'; 

const BlogPage: React.FC = () => {
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const q = query(collection(db, "jurnal"), orderBy("mingguKe", "desc"));
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setJournals(data);
      } catch (error) {
        console.error("Error fetching journals: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Memisahkan logika tampilan agar tidak pakai "nested ternary" yang bikin SonarQube marah
  let content;
  
  if (loading) {
    content = (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 font-medium animate-pulse">Mengambil data dari database...</p>
      </div>
    );
  } else if (journals.length === 0) {
    content = (
      <div className="max-w-4xl mx-auto text-center py-20 bg-white/5 rounded-[2rem] border border-white/10">
        <p className="text-slate-400 font-medium">Belum ada jurnal yang ditulis.</p>
      </div>
    );
  } else {
    content = (
      <div className="max-w-4xl mx-auto space-y-12">
        {journals.map((journal) => (
          <div key={journal.id} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 shadow-lg">
            
            <div className="border-b border-white/10 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Minggu ke-{journal.mingguKe}
              </h2>
              <p className="text-slate-400 mt-2 text-sm font-medium">{journal.tanggal}</p>
            </div>

            {/* 1. Ringkasan Aktivitas Mingguan */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span>1️⃣</span> Ringkasan Aktivitas Mingguan
              </h3>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-white/5 uppercase text-[10px] tracking-wider font-black text-slate-300">
                    <tr>
                      <th className="p-4 border-b border-white/10">Hari</th>
                      <th className="p-4 border-b border-white/10">Fokus Aktivitas</th>
                      <th className="p-4 border-b border-white/10">Output</th>
                      <th className="p-4 border-b border-white/10">Durasi (jam)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {/* Menggunakan act.hari sebagai key unik menggantikan index */}
                    {journal.aktivitas?.map((act: any) => (
                      <tr key={act.hari} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                        <td className="p-4 font-bold">{act.hari}</td>
                        <td className="p-4">{act.fokus}</td>
                        <td className="p-4">{act.output}</td>
                        <td className="p-4 text-center">{act.durasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* 2. Capaian Minggu Ini */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>2️⃣</span> Capaian Minggu Ini
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  {/* Menggunakan optional chaining (?.) dan item sebagai key */}
                  {journal.capaian?.map((item: string) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-green-400">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Kendala Mingguan */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>4️⃣</span> Kendala Mingguan
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li><strong className="text-white">Akademik:</strong> {journal.kendala?.akademik || "-"}</li>
                  <li><strong className="text-white">Teknis:</strong> {journal.kendala?.teknis || "-"}</li>
                  <li><strong className="text-white">Pribadi:</strong> {journal.kendala?.pribadi || "-"}</li>
                </ul>
              </div>
            </div>

            {/* 3. Progress Semester */}
            <div className="mb-8 bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span>3️⃣</span> Progress terhadap Target Semester
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <p><strong className="text-white">Target Semester:</strong> {journal.progress?.target || "-"}</p>
                <div>
                  <div className="flex justify-between mb-1">
                    <strong className="text-white">Progress saat ini</strong>
                    <span className="font-bold text-blue-400">{journal.progress?.persentase || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${journal.progress?.persentase || 0}%` }}></div>
                  </div>
                </div>
                <p><strong className="text-white">Keterangan:</strong> {journal.progress?.keterangan || "-"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 5. Evaluasi Diri */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>5️⃣</span> Evaluasi Diri
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li><strong className="text-white block mb-1">Keberhasilan terbaik minggu ini?</strong> {journal.evaluasi?.terbaik || "-"}</li>
                  <li><strong className="text-white block mb-1">Kesalahan terbesar?</strong> {journal.evaluasi?.kesalahan || "-"}</li>
                  <li><strong className="text-white block mb-1">Strategi minggu depan?</strong> {journal.evaluasi?.strategi || "-"}</li>
                </ul>
              </div>

              {/* 6. Rencana Minggu Depan */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>6️⃣</span> Rencana Minggu Depan
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm list-decimal list-inside">
                  {/* Menggunakan optional chaining (?.) dan item sebagai key */}
                  {journal.rencana?.map((item: string) => (
                    <li key={item} className="marker:text-blue-400 font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 lg:p-24 selection:bg-blue-500/30 font-sans">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 uppercase">
            Jurnal <span className="text-blue-500">Mahasiswa</span>.
          </h1>
          <p className="text-slate-400 font-medium">Laporan Aktivitas Mingguan - Ichya Ulumiddiin</p>
        </div>
        <Link 
          to="/" 
          className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black tracking-wider uppercase text-xs transition-all flex items-center gap-3"
        >
          <span>←</span> KEMBALI
        </Link>
      </div>

      {/* Menampilkan konten yang sudah diproses di atas */}
      {content}
      
    </div>
  );
};

export default BlogPage;