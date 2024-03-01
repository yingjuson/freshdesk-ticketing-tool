<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_id', 'filename', 'mime_type', 'file_dir'];

    protected $appends = [
        'full_path'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    // Accessor method to append storage path to filename attribute
    public function getFullPathAttribute()
    {
        return storage_path('app/' . $this->filename);
    }
}
