<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('auth/login', 'Api\AuthController@login')->name('auth.login');
Route::post('auth/register', 'Api\AuthController@register')->name('auth.register');

Route::group(['middleware' => ['apiJwt']], function() {
    Route::post('auth/logout', 'Api\AuthController@logout')->name('auth.logout');
    
    Route::get('auth/me', 'Api\AuthController@me')->name('auth.me');

    // User
    Route::get('v1/user', 'Api\UserController@index')->name('user.index');
});
