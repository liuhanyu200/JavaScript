<?php
class Sql_model extends SQLite3 
{

	public $url;
    public function __construct($url)
    {
        // parent::__construct();
        $this->open($url);
    }

    // $db = new Sql_model();

    // create table
    public function _createTable()
    {
    	$sql = 'create table table_1(id integer primary key,name text)';
    	$this->exec($sql);
    }
    // insert 
    public function _insertTable()
    {
    	$sql = 'insert into table_1(name) values("lhy")';
    	$this->exec($sql);
    }
    // select
    public function _selectTable()
    {
    	$sql = 'select * from table_1';
    	$ret = $this->query($sql);
	    while($row = $ret->fetchArray(SQLITE3_ASSOC)){
	      echo "ID = ". $row['id'] . "\n";
	      echo "NAME = ". $row['name'] ."\n";
	      echo "AGE = ". $row['age'] ."\n";
	    }
    }
}