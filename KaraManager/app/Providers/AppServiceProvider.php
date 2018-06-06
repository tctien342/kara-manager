<?php

namespace KaraManager\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'KaraManager\Repositories\Contracts\UserRepositoryInterface',
            'KaraManager\Repositories\Eloquents\UserRepository'
        );
        $this->app->bind(
            'KaraManager\Repositories\Contracts\ProductRepositoryInterface',
            'KaraManager\Repositories\Eloquents\ProductRepository'
        );
    }
}
