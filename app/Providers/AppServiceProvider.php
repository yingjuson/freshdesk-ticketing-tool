<?php

namespace App\Providers;

use App\Services\TicketService;
use Illuminate\Support\ServiceProvider;
use \Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(TicketService::class, function ($app) {
            return new TicketService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('APP_ENV') == 'local') {
            URL::forceScheme('http');
        } else {
            URL::forceScheme('https');
        }
            
        // $this->app['request']->server->set('HTTP','on');
    }
}
