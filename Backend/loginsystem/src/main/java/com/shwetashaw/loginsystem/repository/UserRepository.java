package com.shwetashaw.loginsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shwetashaw.loginsystem.entity.User; 

@Repository
public interface UserRepository extends JpaRepository<User,String>{
    // Check if user exists by email
    boolean existsByEmail(String email);
}
