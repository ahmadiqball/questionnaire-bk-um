import { useState } from "react"
import { questions } from "../constants/question";
import { OptionSelector } from "../components/option-selector";
import { Button } from "../components/button";
import classNames from "classnames";
import { useStore } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

interface AnswerState {
  id: number;
  value: number;
}

export function PageAssessment() {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [answer, setAnswer] = useState(questions);
  const { userData, setStoreAnswers } = useStore();
  const answered = Object.values(answer).filter((item) => item.value !== 0).length;

  const sendToDatabase = async () => {
    try {
      const arrayValue = Object.values(answer);
      const savedAnswer = arrayValue.map((item: any) => {
        return {
          id: item.id,
          value: item.value
        }
      })

      await setDoc(doc(firestore, 'assessment', doc(collection(firestore, 'assessment')).id), {
        ...userData,
        answer: JSON.stringify(savedAnswer),
        sessionId: assessmentId,
        createdAt: Timestamp.now(),
      })

      setStoreAnswers(answer);
      navigate(`/assessment/${assessmentId}/result`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuestionValue = (value: number, id: number) => {
    setAnswer({
      ...answer,
      [id]: {
        ...answer[id as keyof typeof questions],
        value
      }
    })
  };

  return (
    <main className="w-full min-h-screen bg-[url(/assets/background-cloud.svg)] bg-center bg-contain">
      <div className="min-h-screen backdrop-blur-[26px] bg-[#F6F5FDB2] pt-32 px-10 sm:px-20 pb-10 sm:pb-[98px]">
        {Object.values(answer).map((item) => (
          <div className="py-20 w-full flex flex-col gap-10 sm:gap-[96px] justify-center items-center">
            <p className="text-[#0A0A0A] font-bold text-3xl sm:text-5xl lg:text-[64px] text-center max-w-[1270px]">{item.question}</p>

            <OptionSelector active={item.value} setActive={updateQuestionValue} id={item.id}/>
          </div>
        ))}
      </div>

      <div className="fixed w-full top-0 left-0 flex gap-4 justify-center items-center flex-col lg:flex-row py-4 lg:py-8 px-10 bg-white bg-opacity-40 backdrop-blur-lg">
        <div className="w-full lg:w-1/2 xl:max-w-[60%]">
          <div className="h-[26px] w-[64px] bg-primary text-center text-white rounded-t-[999px] mx-auto text-xs flex justify-center items-end pb-1">
              {`${answered}/${40}`}
            </div>
          <div className="w-full h-6 bg-[#C2C2C2] border border-primary rounded-lg overflow-hidden">
            <div className="h-full bg-primary rounded-lg" style={{ width: `${100*answered/40}%`}}/>
          </div>
        </div>

        <Button
          disabled={answered < 40} 
          onClick={sendToDatabase} 
          className="w-full lg:absolute right-10"
        >
            Submit
        </Button>
      </div>
    </main>
  )
}