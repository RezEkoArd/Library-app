<?php

namespace App\Exports;

use App\Models\Peminjaman;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportPerpanjanganExport
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

        // Atur Judul Laporan
        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        
        $monthName = $monthNames[$this->month] ?? $this->month;

        $sheet->setCellValue('A1', 'Laporan Perpanjangan Bulan ' . $monthName . ' Tahun ' . $this->year);
        $sheet->mergeCells('A1:E1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Set lebar kolom
        $sheet->getColumnDimension('A')->setWidth(5);
        $sheet->getColumnDimension('B')->setWidth(20);
        $sheet->getColumnDimension('C')->setWidth(20);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(25);
        
        // Menulis header kolom
        $headerRow = 3; // Baris header setelah judul (tambah jarak)
        $headers = [
            'A' => 'No',
            'B' => 'Kode Peminjaman',
            'C' => 'Nama Anggota',
            'D' => 'Tanggal Perpanjangan',
            'E' => 'Tanggal Kembali Baru',
        ];
        
        foreach ($headers as $column => $header) {
            $sheet->setCellValue($column . $headerRow, $header);
        }
        
        // Style header
        $sheet->getStyle('A' . $headerRow . ':E' . $headerRow)->getFont()->setBold(true);
        $sheet->getStyle('A' . $headerRow . ':E' . $headerRow)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FFE0E0E0');
        
        // Menulis data
        $row = $headerRow + 1;
        if ($this->data->isEmpty()) {
            // Jika data kosong, tampilkan pesan
            $sheet->setCellValue('A' . $row, '-');
            $sheet->setCellValue('B' . $row, '-');
            $sheet->setCellValue('C' . $row, '-');
            $sheet->setCellValue('D' . $row, 'Tidak ada data perpanjangan');
            $sheet->setCellValue('E' . $row, '-');
            
            // Merge cells untuk pesan "Tidak ada data"
            $sheet->mergeCells('C' . $row . ':D' . $row);
            $sheet->getStyle('C' . $row)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('C' . $row)->getFont()->setItalic(true);
            
            $row++;
        } else {
            // Jika ada data, tulis data
            $index = 1;
            foreach ($this->data as $perpanjangan) {
                $sheet->setCellValue('A' . $row, $index);
                
                // Ambil kode peminjaman dari relasi
                $kodePeminjaman = $perpanjangan->peminjaman ? $perpanjangan->peminjaman->kode_peminjaman : '-';
                $sheet->setCellValue('B' . $row, $kodePeminjaman);
                
                // Ambil nama anggota dari relasi
                $namaAnggota = $perpanjangan->anggota ? $perpanjangan->anggota->nama_anggota : '-';
                $sheet->setCellValue('C' . $row, $namaAnggota);
                
                // Tanggal perpanjangan dari tabel perpanjangan
                $sheet->setCellValue('D' . $row, $this->formatTanggal($perpanjangan->tanggal_perpanjangan));
                
                // Tanggal kembali baru dari tabel perpanjangan
                $sheet->setCellValue('E' . $row, $this->formatTanggal($perpanjangan->tanggal_kembali_baru));
                
                $row++;
                $index++;
            }
        }
        
        // Add borders to all data
        $lastRow = $row - 1;
        $sheet->getStyle('A' . $headerRow . ':E' . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
        
        // Mengatur nama file
        $fileName = "report_perpanjangan_{$monthName}_{$this->year}.xlsx";
        
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