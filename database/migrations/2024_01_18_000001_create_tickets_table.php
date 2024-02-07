<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('concern_type');
            $table->string('service_type')->nullable();
            $table->string('other_service')->nullable();
            $table->text('issue_details');
            $table->enum('device_type', ['ios', 'android'])->nullable();
            $table->string('customer_mobile_number')->nullable();
            $table->string('gpo_mobile_number')->nullable();
            $table->string('biller_name')->nullable();
            $table->string('biller_ref_number')->nullable();
            $table->string('gpadala_ref_number')->nullable();
            $table->float('transaction_amount', 8, 2)->nullable();
            $table->dateTime('transaction_datetime')->nullable();
            $table->enum('status', [
              'backlog',
              'in progress',
              'completed',
              'closed'
            ])->default('backlog');
            $table->string('report_type')->nullable();
            $table->string('email_subject')->nullable();
            $table->string('gpo_id')->nullable();
            $table->string('partner_ref_number')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('msisdn')->nullable();
            $table->string('report_date')->nullable();
            $table->string('portal_type')->nullable();
            $table->string('role')->nullable();
            $table->foreignId('created_by')->constrained(table: 'users')->cascadeOnDelete(); 
            $table->foreignId('assigned_by')->nullable()->constrained(table: 'users');
            $table->foreignId('assignee_id')->nullable()->constrained(table: 'users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
