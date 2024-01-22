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
            $table->string('concern_type'); // GPO App | Webtool | Reports
            $table->string('service_type')->nullable();
            $table->string('other_service')->nullable();
            $table->string('issue_details');
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
            ]);
            $table->foreignId('created_by')->constrained(table: 'users');
            $table->foreignId('assigned_by')->nullable()->constrained(table: 'users');
            $table->foreignId('assignee_id')->nullable()->constrained(table: 'users');
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
