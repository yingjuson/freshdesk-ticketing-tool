<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ReportController extends Controller
{
    public function export(Request $request) {
        $rows = [];
        $file_type = $request->input('file_type') == 'csv' ? '.csv' : '.xlsx';

        Ticket::whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])
            ->chunk(2000, function ($tickets) use (&$rows) {
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
