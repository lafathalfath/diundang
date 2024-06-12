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
        Schema::create('section', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('component_id')->unsigned();
            $table->bigInteger('undangan_id')->unsigned();
            $table->timestamps();

            $table->foreign('component_id')->references('id')->on('m_component')->onDelete('cascade');
            $table->foreign('undangan_id')->references('id')->on('undangan')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section');
    }
};
