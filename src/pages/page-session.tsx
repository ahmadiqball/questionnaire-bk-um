import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/button";
import { useEffect, useState } from "react";
import { DocumentData, Timestamp, arrayRemove, collection, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const initDate = new Date(Date.now())

export function PageSession() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState<DocumentData | undefined>();
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState(0);
  const minute = Math.floor(timer/60).toLocaleString('en-US', { minimumIntegerDigits: 2});
  const second = Math.round(((timer/60)%1)*60).toLocaleString('en-US', { minimumIntegerDigits: 2})

  const endSessionHandler = async () => {
    if (sessionId) {
      await updateDoc(doc(firestore, 'session', sessionId), {
        active: false
      })

      await setDoc(doc(firestore, 'session', 'active-list'), {
        sessionId: arrayRemove(sessionId)
      })
    }

    navigate('/counselor/session')
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/assessment/start?id=${sessionData?.sessionId}`
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  useEffect(() => {
    async function getSessionData() {
      if (sessionId) {
        const res = await getDoc(doc(firestore, 'session', sessionId));
        const data = res.data();
        setSessionData(data);
      }
    }

    getSessionData();
  }, [sessionId]);

  useEffect(() => {
   if (sessionData) {
    const initialTimer = Timestamp.now().seconds - sessionData.createdAt.seconds;
    setTimer(initialTimer);
    const runTimer = () => {
      setTimer((prev) => prev + 1);
    };

    const interval = setInterval(runTimer, 1000);
    return () => clearInterval(interval);
   }
  }, [sessionData])

  return(
    <main className="w-full h-screen bg-[url(/assets/background-cloud.svg)]  bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-between items-center bg-primary py-5 px-10 md:px-20">
        <h1 className="text-white text-3xl font-bold">{`${minute}:${second}`}</h1>
        <Button light onClick={() => navigate('/counselor/session')} className="w-36">Load Session</Button>
      </div>
    
      <div className="h-[calc(100vh-92px)] flex justify-center items-center bg-[#F6F5FDB2] backdrop-blur-lg">
        <div className="rounded-lg border bg-[#F6F5FD] py-6 px-8 w-[90%] sm:w-fit">
          <h2 className="text-black text-4xl font-bold">Token</h2>

          <div className="mt-4 flex gap-4 items-center">
            <h6 className="text-5xl font-bold text-primary w-[375px]">{sessionData?.sessionId}</h6>
            <div className="hover:cursor-pointer relative min-w-[35px]">
              <img src="/assets/link.svg" className="h-10 hover:cursor-pointer" onClick={copyToClipboard}/>
              { copied ? <p className="text-[10px] text-primary font-bold mt-1 absolute">Copied!</p> : null }
            </div>
          </div>

          <Button className="mt-10 w-full sm:w-full" onClick={() => setModal(true)}>End Session</Button>
        </div>
      </div>

      {modal ? (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A0A0A] bg-opacity-80 flex justify-center items-center">
          <div className="p-10 bg-[#F6F5FD] rounded-lg w-[80%] lg:w-fit flex flex-col items-center">
            <p className="text-black text-2xl font-bold text-center">Apakah anda yakin ingin mengakhiri asesmen ?</p>
            <div className="w-full flex flex-col sm:flex-row justify-center gap-5 lg:gap-10 mt-10">
              <Button className="w-full" onClick={endSessionHandler}>Ya</Button>
              <Button light onClick={() => setModal(false)} className="w-full">Tidak</Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}