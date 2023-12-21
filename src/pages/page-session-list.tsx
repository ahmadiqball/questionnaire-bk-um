import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { useEffect, useRef, useState } from "react";
import { InputText } from "../components/input";
import { arrayRemove, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { downloadExcelFile } from "../utils/excel-downloader";

const dummyData: any[] = []

for (let i=0;i<100;i++) {
  dummyData.push(  { school: 'Table cell', class: 'Table cell', date: 'Table cell' })
}

interface Delete {
  docId: string;
  sessionId: string;
}

export function PageSessionList() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [modal, setModal] = useState<Delete | null>(null);
  const [resultRow, setResultRow] = useState(5);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [ascending, setAscending] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLInputElement>(null);
  const filteredData = fetchedData
  .filter((item) => item.school.toLowerCase().includes(search.toLowerCase()) || item.class.toLowerCase().includes(search.toLowerCase()))
  .sort((a,b) => {
    if (ascending) {
      return b.createdAt.seconds - a.createdAt.seconds;
    } else {
      return a.createdAt.seconds - b.createdAt.seconds;
    }
  })
  const pages = Math.ceil(filteredData.length / resultRow);
  const pagesResult = []
  for (let i=0;i<pages;i++) {
    pagesResult.push(filteredData.slice(resultRow*i, resultRow*(i+1)))
  };
  
  const logoutHandler = () => {
    sessionStorage.removeItem('role');
    navigate('/');
  };

  const searchHandler = () => {
    const rowIp = rowRef.current?.value;
    const searchIp = searchRef.current?.value;

    if (rowIp && parseInt(rowIp) > 0) {
      setResultRow(parseInt(rowIp));
    } else {
      setResultRow(5);
    }

    if (searchIp && searchIp.trim().length > 0) {
      setSearch(searchIp);
    } else {
      setSearch('');
    }
  };

  const deleteSessionHandler = async (docId: string, sessionId: string) => {
    try {
      await deleteDoc(doc(firestore, "session", docId));
      await setDoc(doc(firestore, 'session', 'active-list', ), {
        sessionId: arrayRemove(sessionId)
      })
      setFetchedData(fetchedData.filter((item) => item.id !== docId));
      setModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadSessionData = async (sessionId: string) => {
    try {
      const res = await getDocs(query(collection(firestore, 'assessment'), where('sessionId', '==', sessionId)));
      const resList: any[] = [];
      res.forEach((item) => { 
        const data = item.data();
        const answer = JSON.parse(data.answer);
        const answerObj = {};
        answer.forEach((item: any) => {
          Object.assign(answerObj, { [item.id]: item.value })
        })

        resList.push({
          nama: data.name,
          sekolah: data.school,
          jurusan: data.jurusan,
          kelas: data.class,
          gender: data.gender,
          umur: data.age,
          tanggal_tes: data.createdAt.toDate().toLocaleDateString(),
          ...answerObj
        })
      });

      if (resList.length === 0) {
        setError(true);
        return;
      }

      await downloadExcelFile('assessment', resList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await getDocs(collection(firestore, 'session'));
        const sessions: any[] = [];
        res.forEach((item) => { 
          if (item.id !== 'active-list') {
            sessions.push({ ...item.data(), id: item.id } )
          }
        });
        setFetchedData(sessions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSession();
  }, [])

  return(
    <main>
      <div className="w-full flex justify-between items-center bg-primary py-5 px-5 lg:px-[100px]">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Load Session</h1>
        <Button warning className="w-[150px]" onClick={logoutHandler} >Logout</Button>
      </div>

      <Button className="ml-auto mr-[100px] mt-10" onClick={() => navigate('/counselor/add-session')}>Add session</Button>

      <div className="mx-5 lg:mx-[100px] my-5 lg:my-10 bg-[#EAF2FD] rounded-lg">
        <div className="p-4 flex flex-col sm:flex-row gap-5">
          <InputText placeholder='Search' className='w-full sm:w-[238px]' onChange={searchHandler} ref={searchRef}/>
          <InputText placeholder='Result row per page' className='w-full sm:w-[238px]' type='number' onChange={searchHandler} ref={rowRef} defaultValue={resultRow} />
        </div>

        <div className="w-full overflow-x-scroll">
          <div className="min-w-[560px] grid grid-cols-5 text-lg font-bold text-[#0A0A0A] bg-[#A5BCFF] items-center">
            <span className="py-[14px] px-4 min-w-[140px]">Universitas</span>
            <span className="py-[14px] px-4 min-w-[140px]">Jurusan</span>
            <span className="py-[14px] px-4 min-w-[140px] flex gap-2.5">
              Tanggal Sesi 
              <img src="/assets/chevron.svg" className={`cursor-pointer transition-all duration-300 mt-0.5 ${!ascending ? 'rotate-180' : ''}`} onClick={() => setAscending(!ascending)}/>
            </span>
            <span className="py-[14px] px-4 min-w-[140px]">Status</span>
            <span className="py-[14px] px-4 min-w-[140px]"></span>
          </div>

          <div className="divide-y divide-[#E0E0E0] text-[#404040]">
            {pagesResult[page]?.map((data, index) => (
              <div 
                className={`min-w-[560px] grid grid-cols-5 items-center
                ${data.active ? 'cursor-pointer' : ''}`} 
                key={index}  
                onClick={(e: any) => {                  
                  if (data.active && !e.target.id) navigate(`/counselor/session/${data.id}`)
                }}>
                <span className="py-[14px] px-4 min-w-[140px]">{data.school}</span>
                <span className="py-[14px] px-4 min-w-[140px]">{data.class}</span>
                <span className="py-[14px] px-4 min-w-[140px]">{data.createdAt.toDate().toLocaleDateString()}</span>
                <span className="py-[14px] px-4 min-w-[140px]">{data.active ? 'Aktif' : 'Selesai'}</span>
                <span className="flex justify-end gap-10 py-[14px] px-4 min-w-[140px]">
                  <img src="/assets/download.svg" className="cursor-pointer" id="downloader" onClick={() => downloadSessionData(data.sessionId)}/>
                  <img src="/assets/delete.svg" className="cursor-pointer" id="delete" onClick={() => setModal({ docId: data.id, sessionId: data.sessionId})}/>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {fetchedData.length === 0 ? <div className="py-6 text-center">Silahkan mulai sesi asesmen anda</div> : null}
          {fetchedData.length !== 0 && pagesResult.length === 0 ? <div className="py-6 text-center">Data tidak ditemukan</div> : null}
        
          <div className="flex gap-6 justify-end pt-10 pb-4 pr-4 items-center">
            <span>{`Pages : ${page+1} / ${pagesResult.length}`}</span>
            <button onClick={() => setPage(page-1)} disabled={page === 0}>
              <img src="/assets/prev.svg" />
            </button>
            <button onClick={() => setPage(page+1)} disabled={page === pagesResult.length - 1}>
              <img src="/assets/next.svg" className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A0A0A] bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-md w-[85%] lg:w-[626px] overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h4 className="text-[#0a0a0a] text-4xl font-bold flex items-center">
                <img src="/assets/warning.svg" className="h-9 mt-1 mr-2 -ml-2"/>
                Belum ada data sampel diterima
              </h4>
              <p className="text-[#616161] text-2xl mt-2 ml-9">
                Sesi ini belum menerima input asesmen, silahkan mulai proses pengambilan sampel terlebih dahulu.
              </p>
            </div>
            <div className="flex justify-end bg-[#F5F5F5] py-3 px-6 gap-3">
              <Button className="w-full"  onClick={() => setError(false)}>Tutup</Button>
            </div>
          </div>
        </div>
      ) : null}

      {modal ? (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A0A0A] bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-md w-[85%] lg:w-[626px] overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h4 className="text-[#0a0a0a] text-4xl font-bold flex items-center">
                <img src="/assets/warning.svg" className="h-9 mt-1 mr-2 -ml-2"/>
                Apakah anda yakin menghapus sesi ?
              </h4>
              <p className="text-[#616161] text-2xl mt-2 ml-9">
                Pastikan bahwa data sesi ini memang tidak anda perlukan.
              </p>
            </div>
            <div className="flex justify-end bg-[#F5F5F5] py-3 px-6 gap-3">
              <Button className="w-full"  onClick={() => deleteSessionHandler(modal.docId, modal.sessionId)}>Hapus sesi</Button>
              <Button light className="w-full"  onClick={() => setModal(null)}>Tutup</Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}