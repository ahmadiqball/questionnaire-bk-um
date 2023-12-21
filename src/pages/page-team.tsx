import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"

const team = [
  { name: 'Andi Aditya', id: '220111603051' , img: 'Andi Miring.png' },
  { name: 'Nur Haliza', id: '22011160332' , img: 'Liza Miring.png' },
  { name: 'Renandy Ilham S.', id: '190111600033' , img: 'Renandy Miring.png' },
  { name: 'Septian Wahyu R.N.', id: '220111600498' , img: 'Septian_Wahyu.png' },
]

const mentor = [
  { name: 'Prof. Dr. Hj. Nur Hidayah, M.Pd.', id: 'NIP. 195908171983032001' , img: 'Nur-Hidayah 1.png' },
  { name: 'Mutiarani Rizki Dyah Edy Kaesti. S.Pd', id: '' , img: 'Mutiarani.png' },
]

export function PageTeam() {
  const navigate = useNavigate();

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-cloud.svg)] bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-center items-center bg-primary py-5 px-10 sm:px-20">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Tim Pengembang</h1>
      </div>

      <div className="min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] px-10 sm:px-20 pb-20 backdrop-blur-[26px] bg-[#F6F5FDB2]">
        <div className="flex gap-5 pt-10 flex-col lg:flex-row items-center justify-between">
          <div className="text-primary-light text-4xl sm:text-[64px] sm:leading-[90px] font-bold flex-1 2xl:flex-none flex gap-4 flex-row lg:flex-col justify-center items-center">
            <p className="text-left lg:min-w-[70%] lg:w-full">This is</p>
            <p className="lg:text-[160px] text-primary text-right lg:min-w-[70%] lg:w-full">OUR</p>
            <p className="text-left lg:min-w-[70%] lg:w-full">team</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 flex-1 max-w-[1021px]">
            {team.map((item) => (
              <div className="h-[420px] w-[238px] overflow-hidden rounded-[4px] relative" key={item.id}>
                <img src={`/assets/photo/${item.img}`} />
                <div className="bg-gradient-to-t from-primary via-transparent to-transparent absolute top-0 w-full h-[326px]"/>
                <div className="bg-primary p-2 h-full relative z-10">
                  <p className="text-white text-xl font-bold">{item.name}</p>
                  <p className="text-[#C2C2C2] mt-2">{item.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-5 pt-10 items-center justify-between flex-col lg:flex-row">
          <div className="font-bold my-14 text-4xl sm:text-[64px] text-primary w-1/2 lg:hidden flex gap-4 justify-center">
            <p className="text-left">Lecture</p>
            <p className="text-primary-light text-center">and</p>
            <p className="text-right">Mentor</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {mentor.map((item) => (
              <div className="h-[420px] w-[238px] overflow-hidden rounded-[4px] relative" key={item.id}>
                <img src={`/assets/photo/${item.img}`} className="h-[315px] w-full object-cover object-top"/>
                <div className="bg-gradient-to-t from-primary via-transparent to-transparent absolute top-0 w-full h-[320px]"/>
                <div className="bg-primary p-2 pb-1.5 h-full relative z-10">
                  <p className="text-white text-xl font-bold">{item.name}</p>
                  <p className="text-[#C2C2C2] mt-2">{item.id}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="font-bold text-[128px] text-primary w-1/2 hidden lg:block">
            <p className="text-left">Lecture</p>
            <p className="text-primary-light text-[64px] text-center">and</p>
            <p className="text-right">Mentor</p>
          </div>
        </div>

        <Button light className="ml-auto w-[238px] sm:min-w-[238px] mt-20" onClick={() => navigate('/')}>Kembali ke Home</Button>
      </div>
    </main>
  )
}