<?php
return array(
	'DB_FIELDS_CACHE'=>false,//取消缓存

	'DB_TYPE' => 'mysql',

	// 'DB_LOCALHOST'=>'127.0.0.1',
	// 'DB_NAME'=>'ecommercial',
 	//'DB_USER'=>'root',
 	//'DB_PWD'=>'',
	// 'DB_PORT' => '3306',
    
	'DB_HOST' =>'$_ENV["JAE_MYSQL_IP"]',
	'DB_NAME' =>'$_ENV["JAE_MYSQL_DBNAME"]',
	'DB_USER' =>'$_ENV["JAE_MYSQL_USERNAME"]',
	'DB_PWD' =>'$_ENV["JAE_MYSQL_PASSWORD"]',
	'DB_PORT'=>'$_ENV["JAE_MYSQL_PORT"]',

    'DB_PREFIX'=>'tb_',
    'TMPL_L_DELIM'=>'<{',
	'TMPL_R_DELIM'=>'}>',
);
?>