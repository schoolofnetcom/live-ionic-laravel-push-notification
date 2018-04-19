<?php

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
    return view('welcome');
});

Route::get('/terminar-pagamento', function () {
    //cadastrar order no banco de dados
    //enviar para expedição
    //enviar para e-mail
    //push notification
    $notificationBuilder = new \LaravelFCM\Message\PayloadNotificationBuilder();

    $notificationBuilder->setTitle('Sua compra foi realizada com sucesso')
                        ->setBody('Seu tênis da SON irá chegar em breve');

    $notification = $notificationBuilder->build();

    $dataBuilder = new \LaravelFCM\Message\PayloadDataBuilder();
    //$dataBuilder->addData()
    $data = $dataBuilder->build();
    //tabela devices
    $token = 'cdnUWTqfcvM:APA91bGbW0kU2I1pNcP07Lsg2WhG8RM4HOGZg4zS6y37prXOSlvKSpKWdcFwKMF7fyBtQr_k-8E4aTcbPhaEOEQoeUxcyA1aaRpxt9lrbFmtcNdiTrRgbzfTeEzxbCKizCQaDWY8NSOO';
    \FCM::sendTo($token, null, $notification, null);
    //\FCM::sendTo($token, null, $notification, $data);
});