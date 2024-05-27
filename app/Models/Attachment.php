<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'freshdesk_id',
        'name',
        'content_type',
        'size',
        'attachment_url'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
