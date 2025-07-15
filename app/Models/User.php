<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


     public function getProfileImageUrlAttribute()
    {
        // Ruta a la imagen por defecto
        $defaultProfileImage = 'imgs/profile_images/default.png';

        if ($this->profile_image) {
            if (env('APP_ENV') === 'production') {
                // Entorno de producción
                return asset($this->profile_image);
            } else {
                // Otros entornos (desarrollo, pruebas, etc.)
                return asset('storage/' . $this->profile_image);
            }
        }

        // Retorna la ruta de la imagen por defecto si no hay una imagen de perfil
        return asset($defaultProfileImage);
    }
}
