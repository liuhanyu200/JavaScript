<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

   class Sqlite extends SQLite3
   {
      function __construct()
      {
         $this->open('./application/sql/server.sql');
      }

   }

