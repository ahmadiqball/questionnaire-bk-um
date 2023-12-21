import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { InputText } from "../components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../firebase";

interface Inputs {
  school: string;
  class: string;
}

const validationSchema = z.object({
  school: z.string().trim().min(1),
  class: z.string().trim().min(1),
})


export function PageAddSession() {
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, dirtyFields } 
  } = useForm<Inputs>({
      mode: 'onChange', resolver: zodResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const randomId = (Date.now() * Math.random()).toString().slice(0,6);
      const docId =  doc(collection(firestore, 'session')).id
      await setDoc(doc(firestore, 'session', docId), {
        ...data,
          sessionId: randomId,
        createdAt: Timestamp.now(),
        active: true
      })

      await setDoc(doc(firestore, 'session', 'active-list'), {
        sessionId: arrayUnion(randomId)
      })

      navigate(`/counselor/session/${docId}`);
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-cloud.svg)]  bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-between items-center bg-primary py-5 px-10 md:px-20">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Add Session</h1>
        <Button light onClick={() => navigate('/counselor/session')} className="w-36">Load Session</Button>
      </div>
    
      <div className="py-10 min-h-[calc(100vh-92px)] flex justify-center items-center backdrop-blur-[26px] bg-[#F6F5FDB2]">
        <div className="rounded-lg border border-primary bg-white w-[90%] sm:w-[459px] py-6 px-8">
          <h2 className="text-black text-4xl font-bold">Buat Asesmen</h2>
          <p className="text-[#404040] text-base mt-6 mb-10">Lengkapi data berikut untuk membuat asesmen</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText label="Nama Universitas" placeholder="Ex. Sekolah yang dituju" {...register('school')} error={errors.school} dirtyFields={dirtyFields.school}/>
            <InputText label="Jurusan" placeholder="Ex. 13" className="mt-2" {...register('class')} error={errors.class} dirtyFields={dirtyFields.class}/>
            <Button className="mt-10 w-full sm:w-full" type="submit">Start</Button>
          </form>

        </div>
      </div>
    </main>
  )
}