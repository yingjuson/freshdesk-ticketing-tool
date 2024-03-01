<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelWriter;

use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function export(Request $request) {
        // $validated = $request->validate([
        //     'file_type'     => 'required', 'in:csv,excel',
        //     'start_date'    => 'required', 'date',
        //     'end_date'      => 'required', 'date',
        //     'fields.*'      => 'required'
        // ]);

        $rows = [];
        $file_type = $request->input('file_type') == 'csv' ? '.csv' : '.xlsx';

        Ticket::chunk(2000, function ($tickets) use (&$rows) {
            foreach ($tickets->toArray() as $ticket) {
                $rows[] = $ticket;
            }
        });

        $file_name = 'data_' . now()->format('YmdHis') . $file_type;
        $writer = SimpleExcelWriter::streamDownload($file_name)
            ->addHeader(Schema::getColumnListing('tickets'))
            ->addRows($rows);

            $writer->toBrowser();
    }
}
