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
        Schema::table('users', function (Blueprint $table) {
            // username stelah id
            $table->string('username')->unique()->after('id');
            
            // Kolom role
            $table->string('role',['admin', 'guru', 'siswa'])->default('siswa')->after('password');

            // Telp
            $table->string('no_telp',15)->nullable()->after('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'role', 'no_telp']);
        });
    }
};
