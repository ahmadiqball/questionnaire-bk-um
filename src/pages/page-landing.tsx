import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../components/button";
import { useRef } from "react";
import { ResultPDF } from "../components/result-pdf";

export function PageLanding() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { playMusic } = useOutletContext<any>();
  const startHandler = () => {
    playMusic();
    navigate('/guide');
  }

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-cloud.svg)] bg-center bg-cover bg-no-repeat">
      <div className="min-h-screen py-10 bg-[#F6F5FDB2] backdrop-blur-lg text-black flex flex-col justify-center items-start px-5 sm:px-[100px] text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl leading-relaxed lg:leading-none lg:text-[64px] font-bold">
            APLIKASI INVENTORI <br /> PEMAHAMAN SEKSUAL SEHAT <br /> GEN-Z
          </h1>

          <div className="mt-14 mb-20 max-w-[800px] text-xl">
            Seksual sehat merupakan suatu pengetahuan tentang seksual yang maksimal dan memahami perilaku-perilaku batasan seksual yang sehat.
          </div>

          <div className="flex gap-5 flex-col sm:flex-row w-full">
            <Button onClick={startHandler} className="w-full">Start</Button>
            <Button light onClick={() => navigate('/team')} className="w-full">Tentang Kami</Button>
          </div>

          <div className="text-sm flex gap-2 mt-3 justify-center sm:justify-start w-full">
            <p className="text-[#616161]">Are you conselor?</p>
            <Link to='/counselor/start' className="text-primary">Login here</Link>
          </div>
      </div>
    </main>
  ) 
}