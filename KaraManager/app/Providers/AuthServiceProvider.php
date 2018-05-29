<?php

namespace KaraManager\Providers;

use Auth;
use KaraManager\Http\Controllers\Auth\CustomUserProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'KaraManager\Model' => 'KaraManager\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Auth::provider('custom', function($app, array $config) {
            return new CustomUserProvider();
        });
        //
    }
}
