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
            $table->string('subject');
            $table->text('issue_details');
            $table->enum('device_type', ['ios', 'android'])->nullable();
            $table->string('device_model')->nullable();
            $table->string('device_os_version')->nullable();
            $table->string('customer_mobile_number')->nullable();
            $table->string('gpo_mobile_number')->nullable();
            $table->string('biller_name')->nullable();
            $table->string('biller_ref_number')->nullable();
            $table->string('gpadala_ref_number')->nullable();
            $table->string('cash_in_code')->nullable();
            $table->string('freshdesk_id')->nullable();
            $table->float('transaction_amount', 8, 2)->nullable();
            $table->dateTime('transaction_datetime')->nullable();
            $table->enum('status', [
              'open',
              'pending',
              'resolved',
              'closed'
            ])->default('open');
            $table->string('report_type')->nullable();
            $table->string('gpo_id')->nullable();
            $table->string('ext_transaction_id')->nullable();
            $table->string('report_date')->nullable();
            $table->string('portal_type')->nullable();
            $table->string('webtool_role')->nullable();
            $table->string('freshdesk_assignee')->nullable();
            $table->foreignId('created_by')->constrained(table: 'users')->cascadeOnDelete();
            $table->dateTime('closed_at')->nullable(); // date and time when ticket was resolved or closed
            $table->timestamps();
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
