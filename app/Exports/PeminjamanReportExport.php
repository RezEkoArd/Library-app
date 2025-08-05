<?php

namespace App\Exports;

use App\Models\Peminjaman;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PeminjamanReportExport
{
    protected $data;
    protected $year;
    protected $month;

    public function __construct(Collection $data, int $year, int $month)
    {
        $this->data = $data;
        $this->year = $year;
        $this->month = $month;
    }

    public function generate(): StreamedResponse
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Atur Judul Laporan
        
        $sheet->setCellValue('A1', 'Laporan Peminjaman Bulan ' . $this->month . ' Tahun ' . $this->year);
        $sheet->mergeCells('A1:H1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Set lebar kolom
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('C')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(25);
        $sheet->getColumnDimension('F')->setWidth(30);
        $sheet->getColumnDimension('G')->setWidth(10);
        $sheet->getColumnDimension('H')->setWidth(15);
        
        // Menulis header kolom
        $headerRow = 3; // Baris header setelah judul (tambah jarak)
        $headers = [
            'A' => 'No',
            'B' => 'Kode Peminjaman',
            'C' => 'Tanggal Pinjam',
            'D' => 'Tanggal Kembali Rencana',
            'E' => 'Tanggal Kembali Aktual',
            'F' => 'Catatan',
            'G' => 'Total Buku',
            'H' => 'Status'
        ];
        
        foreach ($headers as $column => $header) {
            $sheet->setCellValue($column . $headerRow, $header);
        }
        
        // Style header
        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFont()->setBold(true);
        $sheet->getStyle('A' . $headerRow . ':H' . $headerRow)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FFE0E0E0');
        
        // Menulis data
        $row = $headerRow + 1;
        $index = 1;
        
        foreach ($this->data as $peminjaman) {
            $sheet->setCellValue('A' . $row, $index);
            $sheet->setCellValue('B' . $row, $peminjaman->kode_peminjaman);
            $sheet->setCellValue('C' . $row, $this->formatTanggal($peminjaman->tanggal_pinjam));
            $sheet->setCellValue('D' . $row, $this->formatTanggal($peminjaman->tanggal_kembali_rencana));
            $sheet->setCellValue('E' . $row, $this->formatTanggal($peminjaman->tanggal_kembali_actual));
            $sheet->setCellValue('F' . $row, $peminjaman->catatan ?? '-');
            $sheet->setCellValue('G' . $row, $peminjaman->total_buku);
            $sheet->setCellValue('H' . $row, ucfirst($peminjaman->status));
        
            $row++;
            $index++;
        }
        
        // Add borders to all data
        $lastRow = $row - 1;
        $sheet->getStyle('A' . $headerRow . ':H' . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
        
        // Mengatur nama file
        $fileName = "report_peminjaman_{$this->month}_{$this->year}.xlsx";
        
        // Menyiapkan Writer
        $writer = new Xlsx($spreadsheet);
        
        // Membuat StreamedResponse
        $response = new StreamedResponse(function () use ($writer) {
            $writer->save('php://output');
        });
        
        // Menentukan header
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', "attachment;filename=\"{$fileName}\"");
        $response->headers->set('Cache-Control', 'max-age=0');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', '0');
        
        return $response;
    }

    // Fungsi pembantu untuk format tanggal
    private function formatTanggal($tanggal)
    {
        return $tanggal ? Carbon::parse($tanggal)->format('d F Y') : '-';
    }
}