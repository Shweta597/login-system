package com.shwetashaw.loginsystem.service;

import com.shwetashaw.loginsystem.repository.UserRepository;
import com.shwetashaw.loginsystem.entity.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;


    AuthService(UserRepository repository){
        this.repository = repository;
    }

    public boolean userExists(String email){
        return repository.existsByEmail(email);

    }

    public User registerUser(User user){
        return repository.save(user);



    }
    
}
