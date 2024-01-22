<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

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
    ];

    public function createdBy(): BelongsTo {
      return $this->belongsTo(User::class);
    }

    // TO DO: define other relationships
}
