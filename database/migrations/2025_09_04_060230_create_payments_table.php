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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('id_user')->nullable();
            $table->string('period');
            $table->integer('nominal');
            $table->integer('id_petugas')->nullable();
            $table->integer('id_member')->nullable();
            $table->integer('total_bayar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
