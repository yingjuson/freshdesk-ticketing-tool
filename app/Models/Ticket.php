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
        'other_service',
        'issue_details',
        'device_type',
        'customer_mobile_number',
        'gpo_mobile_number',
        'biller_name',
        'biller_ref_number',
        'gpadala_ref_number',
        'transaction_amount',
        'transaction_datetime',
        'status',
        'created_by',
        'assigned_by',
        'assignee_id',
        'portal_type',
        'role',
        'report_type',
        'email_subject',
        'report_date',
        'gpo_id',
        'partner_ref_number',
        'transaction_id',
        'msisdn',
    ];

    public function createdBy() {
      return $this->belongsTo(User::class);
    }

    // TO DO: define other relationships
}
