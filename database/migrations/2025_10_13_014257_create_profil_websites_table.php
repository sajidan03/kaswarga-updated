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
        Schema::create('profil_websites', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nama')->nullable();
            $table->string('nama_kepala')->nullable();
            $table->string('foto_kepala')->nullable();
            $table->string('deskripsi')->nullable();
            $table->string('visi_misi')->nullable();
            $table->string('logo')->nullable();
            $table->string('hero')->nullable();
            $table->year('tahun_berdiri', 4)->nullable();
            $table->string('alamat')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('youtube')->nullable();
            $table->string('gmap')->nullable();
            $table->string('warna')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_websites');
    }
};
