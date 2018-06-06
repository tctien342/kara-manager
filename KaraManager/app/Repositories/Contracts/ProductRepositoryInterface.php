<?php
// app/Repositories/Contracts/ProductRepositoryInterface.php

namespace KaraManager\Repositories\Contracts;

interface ProductRepositoryInterface
{
    public function findOneDay($time);
    public function findFromDay($time);
    public function findFromToDay($time_start,$time_end);
}