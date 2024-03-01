<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'concern_type',
        'service_type',
        'subject',
        'issue_details',
        'device_type',
        'device_model',
        'device_os_version',
        'customer_mobile_number',
        'gpo_mobile_number',
        'biller_name',
        'biller_ref_number',
        'freshdesk_ticket_number',
        'gpadala_ref_number',
        'transaction_amount',
        'transaction_datetime',
        'status',
        'created_by',
        'assignee_id',
        'portal_type',
        'webtool_role',
        'report_type',
        'report_date',
        'gpo_id',
        'partner_ref_number',
        'transaction_id',
        'msisdn',
    ];

    public function creator() {
      return $this->belongsTo(User::class, 'created_by');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
