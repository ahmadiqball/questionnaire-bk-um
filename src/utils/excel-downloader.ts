import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const header = ['nama', 'sekolah', 'jurusan', 'kelas', 'gender', 'umur', 'tanggal_tes']
const questionHeader: string[] = []
for (let i=1;i<=46;i++) {
  questionHeader.push(i.toString())
}

export async function downloadExcelFile(filename: string, input: any[]) {
  const accumulator = {};
  let meanAcc = 0;
  questionHeader.forEach((item) => {
    let count = 0;
    input.forEach((value) => {
      count+=value[item]
    })
    const qsMean = count/input.length
    meanAcc+=qsMean;
    Object.assign(accumulator, { [item]: qsMean })
  })

  const summObj = {
    sekolah: input[0].sekolah,
    jurusan: input[0].jurusan,
    kelas: input[0].kelas,
    tanggal_tes: input[0].tanggal_tes,
    rata_rata: meanAcc/46,
    ...accumulator
  }

  const wsAll = utils.json_to_sheet(input, { header: [...header, ...questionHeader]});
  const wsSumm = utils.json_to_sheet([summObj], { header: ['sekolah', 'jurusan', 'kelas', 'tanggal_tes', 'rata_rata', ...questionHeader]});
  const wb = utils.book_new();
  utils.book_append_sheet(wb, wsAll, 'All record');
  utils.book_append_sheet(wb, wsSumm, 'Summary');
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
}