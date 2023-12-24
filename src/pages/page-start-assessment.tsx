import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Button } from "../components/button";
import { InputDropdown, InputRadio, InputText } from "../components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { useRef, useState } from "react";
import { useStore } from "../store";

interface Inputs {
  name: string;
  age: number;
  gender: string;
  school: string;
  jurusan: string;
  class: string;
  token: string;
}

const validationSchema = z.object({
  name: z.string().trim().min(1),
  age: z.string().transform(val => parseInt(val)).refine(val => val > 0),
  gender: z.string(),
  jurusan: z.string().trim().min(1),
  school: z.string().trim().min(1),
  token: z.string().length(6)
})

export function PageStartAssessment() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('id');
  const { playMusic } = useOutletContext<any>();
  const [error, setErrors] = useState(false);
  const { setUserData } = useStore();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, dirtyFields },
    setError
  } = useForm<Inputs>({
    mode: 'onChange', resolver: zodResolver(validationSchema)
  });
  console.log("🚀 ~ file: page-start-assessment.tsx:42 ~ PageStartAssessment ~ errors:", errors)

  const selectRef = useRef<HTMLInputElement>(null)
  
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const dbData = await getDoc(doc(firestore, 'session', 'active-list'))
      const active = dbData.data()?.sessionId

      if (!selectRef.current?.value) {
        setError('class', { message: 'Class can\'t be empty'});
      }

      if (!active.includes(data.token)) {
        setErrors(true);
        return;
      }

      setUserData({
        name: data.name,
        age: data.age,
        gender: data.gender,
        school: data.school,
        jurusan: data.jurusan,
        class: selectRef.current?.value || '',
      })
      playMusic();
      navigate(`/assessment/${data.token}`)
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-blob.svg)] bg-center bg-cover bg-no-repeat">    
      <div className="py-10 min-h-screen flex justify-center items-center backdrop-blur-lg bg-[#0A0A0A] bg-opacity-80">
        <div className="rounded-lg border border-primary bg-white backdrop-blur-[26px] w-[90%] sm:w-auto py-6 px-8 max-w-[495px]">
          <h2 className="text-black text-4xl font-bold">Mulai Asesmen</h2>
          <p className="text-[#404040] text-base mt-6 mb-10 max-w-[367px]">Masukkan biodata kamu dengan lengkap untuk mengakses asesmen</p>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <InputText label="Nama" placeholder="Ex. JennieKim" className="w-full" {...register('name')} error={errors.name} dirtyFields={dirtyFields.name}/>
              <InputText label="Usia" placeholder="Ex. 13" className="w-[100px]" type="text" {...register('age')} error={errors.age} dirtyFields={dirtyFields.age}/>
            </div>

            <InputRadio options={['Laki-laki', 'Perempuan']} label="Jenis kelamin" className="mt-[14px]" {...register('gender')} error={errors.gender}/>
            <InputText label="Sekolah/Universitas" placeholder="Ex. Sekolah Asal Kamu"  className="mt-[14px]" {...register('school')} error={errors.school} dirtyFields={dirtyFields.school}/>
            <div className="grid grid-cols-2 gap-2">
              <InputText label="Jurusan" placeholder="Ex. Jurusan Kamu"  className="mt-[14px]" {...register('jurusan')} error={errors.jurusan} dirtyFields={dirtyFields.jurusan}/>
              <InputDropdown label="Kelas" placeholder="Select" ref={selectRef}  className="mt-[14px]" error={errors.class}/>
            </div>
            <InputText label="Token" placeholder="Ex. 123456" className="mt-[14px]" {...register('token')} error={errors.token} dirtyFields={dirtyFields.token || sessionId} defaultValue={sessionId}/>
            
            <Button className="mt-10 w-full sm:w-full" type='submit'>Lanjut</Button>
          </form>

        </div>
      </div>

      {error ? (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A0A0A] bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-md w-[85%] lg:w-[626px] overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h4 className="text-[#0a0a0a] text-4xl font-bold flex items-center">
                <img src="/assets/warning.svg" className="h-9 mt-1 mr-2 -ml-2"/>
                Token Salah
              </h4>
              <p className="text-[#616161] text-2xl mt-2 ml-9">
                Token yang anda masukkan salah. Mohon isi kembali dan pastikan yang anda masukkan benar.
              </p>
            </div>
            <div className="flex justify-end bg-[#F5F5F5] py-3 px-6 gap-3">
              <Button
                className="w-full" 
                light 
                onClick={() => {
                  setErrors(false);
                  navigate('/');
                }}
              >
                Kembali ke Home
              </Button>
              <Button className="w-full"  onClick={() => setErrors(false)}>Masukkan Token</Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}