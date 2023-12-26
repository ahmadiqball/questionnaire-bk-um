import { forwardRef } from "react";

const scoring = [
  { skor: '75-100%', class: 'Tinggi' },
  { skor: '50-74,3%', class: 'Cukup' },
  { skor: '25-49,3%', class: 'Rendah' },
];

const points = [
  'Pemahaman yang tinggi mengenai kendali dirinya serta aktivitas seksual tidak sehat yang perlu dihindari.',
  'Pemahaman yang tinggi mengenai nilai dan Batasan hubungan di Masyarakat serta cara menjalin hubungan yang sehat.',
  'Pemahaman yang tinggi mengenai informasi & keselamatan diri dalam konteks seksualitas yang sehat.'
]

const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktover', 'November', 'Desember']

export const ResultPDF = forwardRef<HTMLDivElement, any>(({data}, ref) => {
  const date = new Date();
  const formDate = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

  return(
    <div className="bg-white w-[890px] h-[1255px] font-garamond pt-12 px-[120px]" ref={ref}>
      <div className="text-center border-b-2 border-black relative mx-auto pb-2">
        <p className="font-garamond">KEMENTRIAN RISET, TEKNOLOGI, DAN PENDIDIKAN TINGGI</p>
        <p>UNIVERSITAS NEGERI MALANG</p>
        <p>FAKULTAS ILMU PENDIDIKAN</p>
        <p>JURUSAN BIMBINGAN DAN KONSELING</p>
        <p>Jalan Semarang 5 Malang, 65415, Telp: 0341-566962</p>
        <p>Laman: 
          <a className="underline text-[#0563c1]" href="www.um.ac.id">www.um.ac.id</a>
          : <a className="underline text-[#0563c1]" href="mailto:fip@malang.ac.id">fip@malang.ac.id</a>
        </p>

        <img src="/assets/android-chrome-192x192.png" className="absolute w-32 h-32 -top-2 -left-14"/>
      </div>
      
      <h1 className="text-center font-bold pt-7">LAPORAN HASIL <br />PEMAHAMAN SEKSUALITAS SEHAT GENERASI Z</h1>

      <div className="grid grid-cols-2 pt-4">
        <div className="flex">
          <span className="min-w-[130px] inline-block">Nama</span>
          <span className="pr-2">:</span>
          <span className="capitalize">{data.name}</span>
        </div>
        <div className="flex">
          <span className="min-w-[130px] inline-block">Asal Sekolah</span>
          <span className="pr-2">:</span>
          <span>{data.school}</span>
        </div>
        <div>
          <span className="w-[130px] inline-block">Jenis Kelamin</span>
          <span className="pr-2">:</span>
          <span>{data.gender}</span>
        </div>
        <div>
          <span className="w-[130px] inline-block">Tanggal Pengisian</span>
          <span className="pr-2">:</span>
          <span>{formDate}</span>
        </div>
        <div>
          <span className="w-[130px] inline-block">Usia</span>
          <span className="pr-2">:</span>
          <span>{data.age}</span>
        </div>
      </div>

      <h1 className="text-center font-bold pt-4">HASIL ANALISA</h1>

      <p className="pt-3">Berdasarkan pengisian inventori “SEKSULITAS SEHAT” <span className="font-bold capitalize">{data.name}</span> memiliki tingkat Seksualitas Sehat sebesar <span className="font-bold">{data.score} %</span> dan terklasifikasi <span className="font-bold">{data.result}</span></p>

      <div className="border border-black divide-y divide-black mt-4 leading-5">
        <div className="w-full divide-x divide-black font-bold">
          <span className="w-[15%] inline-block text-center pb-2">Skor</span>
          <span className="w-[15%] inline-block text-center pb-2">Klasifikasi</span>
          <span className="w-[70%] inline-block text-center pb-2">Interpetasi</span>
        </div>
        
        {scoring.map((item) => (
          <div className="w-full divide-x divide-black flex">
            <span className="w-[15%] inline-block text-center grow">{item.skor}</span>
            <span className="w-[15%] inline-block text-center grow">{item.class}</span>
            <span className="w-[70%] inline-block text-left px-2 pb-3">
              <p>Individu memiliki pemahaman seksualitas sehat yang <span className="font-bold">{item.class}</span>, dengan keterangan sebagai berikut:</p>
              <ol className="list-decimal pl-8">
                {points.map((item) => (
                  <li>{item}</li>
                ))}
              </ol>
            </span>
          </div>
        ))}
      </div>

      <div className="flex pt-3">
        <div className="pr-[350px]">
          <p>Mengetahui,</p>
          <p>Kepala Sekolah</p>

          <p className="pt-10">Kepala sekolah</p>
          <p>NIP. </p>
        </div>

        <div>
          <p>Malang, {formDate} </p>
          <p>Konselor</p>

          <p className="pt-10 font-bold underline">Konselor</p>
          <p>NIP. </p>
        </div>
      </div>
    </div>
  )
});