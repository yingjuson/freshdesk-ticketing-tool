<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::location('/login');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register')
    // ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::group(['middleware' => ['auth', 'spatie.csp']], function () {
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //  --> test routes
    Route::get('/test-dashboard', [TicketController::class, 'test_dashboard_with_ticket_props'])->name('tickets.test_dashboard_with_ticket_props');
    Route::get('/test-show-tickets', [TicketController::class, 'test_show_with_ticket_attachments'])->name('tickets.test_show_with_ticket_attachments');
    Route::get('/test-show', [TicketController::class, 'test_show'])->name('tickets.test_show');
    Route::get('/test-tickets-db', [DashboardController::class, 'test_tickets'])->name('dashboard.test_tickets');
    // test routes <--

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');
    Route::put('/tickets/{ticket}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy');

    Route::get('/files', [ReportController::class, 'export'])->name('files.export');
});



require __DIR__.'/auth.php';
