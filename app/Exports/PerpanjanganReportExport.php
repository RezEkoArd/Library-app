<?php

use Illuminate\Database\Eloquent\Collection;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Carbon\Carbon;

class PerpanjanganReportExport
{
    protected $data;
    protected $year;
    protected $month;

    public function __construct(Collection $data, int $month, int $year)
    {
        $this->data = $data;
        $this->year = $year;
        $this->month = $month;
    }


    public function generate(): StreamedResponse
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Judul Laporan
        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        
        $monthName = $monthNames[$this->month] ?? $this->month;


        // Judul Laporan
        $sheet->setCellValue('A1', 'Laporan Perpanjangan buku Bulan ' . $monthName . ' Tahun ' . $this->year);
        $sheet->mergeCells('A1:H1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Set lebar 
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('C')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(25);
        $sheet->getColumnDimension('F')->setWidth(30);
        $sheet->getColumnDimension('G')->setWidth(10);
        $sheet->getColumnDimension('H')->setWidth(15);
        $sheet->getColumnDimension('J')->setWidth(15);

        // Menulis header kolom
        $headerRow = 3;
        $header = [
            'A' => 'No',
            'B' => 'Kode Peminjaman',
            'C' => 'Nama Anggota',
            'D' => 'Tanggal Pinjam Awal',
            'E' => 'Tanggal Kembali Lama',
            'F' => 'Tanggal Kembali Baru',
            'G' => 'Tanggal Perpanjangan',
            'H' => 'Petugas',
        ];

        foreach ($header as $column => $label)
        {
            $sheet->setCellValue($column . $headerRow, $label);
        }

        // Style header
        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFont()->setBold(true);
        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FFE0E0E0');

        // menulis data
        $row = $header + 1;

        if ($this->data->isEmpty()) {
            // Jika data kosong, tampilkan pesan
            $sheet->setCellValue('A' . $row, '-');
            $sheet->setCellValue('B' . $row, '-');
            $sheet->setCellValue('C' . $row, '-');
            $sheet->setCellValue('D' . $row, 'Tidak ada data peminjaman');
            $sheet->setCellValue('E' . $row, '-');
            $sheet->setCellValue('F' . $row, '-');
            $sheet->setCellValue('G' . $row, '-');
            $sheet->setCellValue('H' . $row, '-');
            
            // Merge cells untuk pesan "Tidak ada data"
            $sheet->mergeCells('D' . $row . ':F' . $row);
            $sheet->getStyle('D' . $row)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('D' . $row)->getFont()->setItalic(true);
            
            $row++;
        } else {
            // Jika ada data, tulis data
            $index = 1;
            foreach ($this->data as $peminjaman) {
                $sheet->setCellValue('A' . $row, $index);
                $sheet->setCellValue('B' . $row, $peminjaman->kode_peminjaman);
                $sheet->setCellValue('C' . $row, $peminjaman->nama_anggota);
                $sheet->setCellValue('D' . $row, $index);
                $sheet->setCellValue('E' . $row, $index);
                $sheet->setCellValue('F' . $row, $index);
                $sheet->setCellValue('G' . $row, $index);
                $sheet->setCellValue('H' . $row, $index);
                
                $row++;
                $index++;
            }
        }


        // foreach ($this->data as $peminjaman) {
            $sheet->setCellValue('A' . $row, $index);
            $sheet->setCellValue('B' . $row, $peminjaman->kode_peminjaman);
            $sheet->setCellValue('C' . $row, $peminjaman->nama_anggota);
            $sheet->setCellValue('D' . $row, $index);
            $sheet->setCellValue('E' . $row, $index);
            $sheet->setCellValue('F' . $row, $index);
            $sheet->setCellValue('G' . $row, $index);
            $sheet->setCellValue('H' . $row, $index);

        //     $index++;
        //     $row++;
        // }

        // Add border
        $lastRow = $row-1;
        $sheet->getStyle('A' . $headerRow . ':H' . $lastRow)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['argb' => '000000'],
                ],
            ],
        ]);

        // Mengatur nama file
        $fileName = "report_perpanjangan_" . $monthName . "_" . $this->year . ".xlsx";

        // Menyiapkan nama file
        $writer = new Xlsx($spreadsheet);

        // mengirim file Excel sebagai response
        $response = new StreamedResponse(function () use ($writer) {
            $writer->save('php://output');
        });

        // Menentukan header
        $response->headers->set('Content-Type', 'app;ication/vmd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition',"attachment;filename=\"{$fileName}\"");
        $response->headers->set('Cache-Control', 'max-age=0');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', '0');

        return $response;
    }

    private function formatTanggal($tanggal)
    {
        return $tanggal ? Carbon::parse($tanggal)->format('d F Y') : '-';
    }
}