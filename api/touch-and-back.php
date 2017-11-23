<?php
header('Content-type: text/plain; charset=UTF-8');
require_once('../dst/php/phpQuery-onefile.php');
date_default_timezone_set('Asia/Tokyo');
$day =  date('sd');

$from = $_POST['from'];
$to = $_POST['to'];
// $from = "%E9%83%BD%E8%B3%80";
// $to = "%E5%8D%83%E8%91%89";
$URL = 'https://transit.yahoo.co.jp/search/result?&from='.$from.'&to='.$to;

$html = file_get_contents($URL);
$doc = phpQuery::newDocument($html);
$time = pq($doc['#rsltlst']->find('.time:eq(0)'));

$departure = explode('→', $time->text())[0];
$arrival= $time->find('.mark')->text();
$required = $time->find('.small')->text();

$res = array(
  'departure' => $departure,
  'arrival' => $arrival,
  'required' => $required,
  'day' => $day
);


$arr = explode(':', $arrival);
$to_from = 'https://transit.yahoo.co.jp/search/result?&from='.$to.'&to='.$from;
$URL2 = $to_from.'&d='.$day.'&hh='.substr($arr[0], 0, 2).'&m1='.substr($arr[1], 0, 1).'&m2='.substr($arr[1], 1, 2);

$html2 = file_get_contents($URL2);
$doc2 = phpQuery::newDocument($html2);
$time2 = pq($doc2['#rsltlst']->find('.time:eq(0)'));

$departure2 = explode('→', $time2->text())[0];
$arrival2= $time2->find('.mark')->text();
$required2 = $time2->find('.small')->text();

$res['departure2'] = $departure2;
$res['arrival2'] = $arrival2;
$res['required2'] = $required2;


header('Content-Type:application/json; charset=utf-8');
echo json_encode($res, JSON_UNESCAPED_UNICODE);
