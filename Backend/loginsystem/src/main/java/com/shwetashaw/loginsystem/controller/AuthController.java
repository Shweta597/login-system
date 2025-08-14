package com.shwetashaw.loginsystem.controller;

import com.shwetashaw.loginsystem.service.AuthService;
import com.shwetashaw.loginsystem.entity.User;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow React app
class AuthController {

    private final AuthService service;

    AuthController(AuthService service){
        this.service = service;
    }

    @GetMapping("/")
    public String homePage(){
        return "Hello from homePage";
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User request) {

        try {
            boolean isUser = service.userExists(request.getEmail());
            
            if (isUser) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body(Map.of(
                        "message", "User already registered",
                        "firstName", request.getFirstName()
                    ));
            }
        
            User saved = service.registerUser(request);
        
            return ResponseEntity
                .status(HttpStatus.CREATED) // 201 Created
                .body(Map.of(
                    "firstName", saved.getFirstName(),
                    "lastName", saved.getLastName(),
                    "email", saved.getEmail()
                ));
        
            } catch (IllegalArgumentException e) {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST) // 400 Bad Request
                    .body(Map.of("error", e.getMessage()));
            }
        
    
    }
    

    
}

//1 uder details
//2 email already 
//
