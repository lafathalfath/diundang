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
        Schema::create('page_undangan', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('undangan_id')->unsigned();
            $table->bigInteger('section_id')->unsigned();
            $table->timestamps();

            $table->foreign('undangan_id')->references('id')->on('undangan')->onDelete('cascade');
            $table->foreign('section_id')->references('id')->on('section')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_undangan');
    }
};
