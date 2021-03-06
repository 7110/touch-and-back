<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once('../dst/php/phpQuery-onefile.php');
date_default_timezone_set('Asia/Tokyo');
$day =  date('d');

$from = $_POST['from'];
$to = $_POST['to'];
$URL = 'https://transit.yahoo.co.jp/search/result?&from='.$from.'&to='.$to;

$html = file_get_contents($URL);
$doc = phpQuery::newDocument($html);
$time = pq($doc['#rsltlst']->find('.time:eq(0)'));

$departure = explode('→', $time->text());
$arrival= $time->find('.mark')->text();
$required = $time->find('.small')->text();

$res = array(
  'departure' => $departure[0],
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

$departure2 = explode('→', $time2->text());
$arrival2= $time2->find('.mark')->text();
$required2 = $time2->find('.small')->text();

$res['departure2'] = $departure2[0];
$res['arrival2'] = $arrival2;
$res['required2'] = $required2;


header('Content-Type:application/json; charset=utf-8');
echo json_encode($res, 128);
