import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { useStore } from "../store";
import { ResultPDF } from "../components/result-pdf";
import { usePDF } from "react-to-pdf";

const resultList = [
  'Cara individu menilai dirinya sendiri ke arah negatif',
  'Reaksi berlebihan akan suatu kondisi',
  'Pengelolaan emosi yang buruk akan suatu kejadian buruk',
  'Tekanan yang timbul dari lingkunggan sekitar'
]

export function PageAssessmentResult() {
  const navigate = useNavigate();
  const { storeAnswers, userData } = useStore();
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const arrayAnswer = Object.values(storeAnswers)
  const total = arrayAnswer.reduce((res, cur) => res + (cur.value || 0), 0)
  
  const result = total <= 79 
  ? 'Kurang'
  : total <= 119 
  ? 'Cukup'
  : 'Tinggi';

  const pdfData = {
    name: userData?.name,
    school: userData?.school,
    gender: userData?.gender,
    age: userData?.age,
    score: Math.ceil(100*total/140),
    result: result
  }

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-white.svg)] bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-between items-center bg-primary py-5 px-10 sm:px-20">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Hasil Asesmen</h1>
      </div>

      <div className="px-10 lg:px-[100px] py-14 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center overflow-hidden max-w-full w-full sm:overflow-visible relative pt-[500px] sm:pt-[1000px] lg:pt-0">
          <div className="shadow-xl scale-[0.4] sm:scale-75 lg:scale-100 absolute -top-[350px] sm:-top-[150px] lg:relative lg:top-0">
            <ResultPDF data={pdfData}/>
          </div>
          <Button light className="mt-20" onClick={toPDF}>Download PDF</Button>
        </div>

        <Button className="mt-20 ml-auto" onClick={() => navigate('/')}>Kembali ke Home</Button>
      </div>
      <div className="absolute bottom-full"> 
        <ResultPDF ref={targetRef} data={pdfData}/>
      </div>
    </main>
  )
}