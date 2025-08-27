package com.shwetashaw.loginsystem.controller;

import com.shwetashaw.loginsystem.entity.User;
import com.shwetashaw.loginsystem.service.AuthService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Optional; 
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

    // ✅ LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Optional<User> userOptional = service.loginUser(email, password);
        boolean isUserExist = service.userExists(email);

        if(!isUserExist){
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND) // 404 Not Found
                .body(Map.of("error", "User Email not Registered, Please SignUp"));


        } 
        
        else if(userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(
                Map.of(
                    "message", "Login successful",
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "email", user.getEmail()
                )
            );
        } 
        else {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED) // 401 Unauthorized
                .body(Map.of("error", "Invalid email or password"));
        }
    }

    
}
