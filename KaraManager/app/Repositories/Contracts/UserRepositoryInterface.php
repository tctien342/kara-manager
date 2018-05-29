<?php
// app/Repositories/Contracts/ProductRepositoryInterface.php

namespace KaraManager\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function all();
    public function find($id);
    public function findUserWithEmail($email);
    public function createNewUser($profile);
    public function newUserWithEmail($email, $pass);
    public function forgot($email, $newpassword);
}