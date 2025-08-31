package com.shwetashaw.loginsystem.controller;

import com.shwetashaw.loginsystem.entity.User;
import com.shwetashaw.loginsystem.service.AuthService;
import com.shwetashaw.loginsystem.security.JwtUtil;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Optional; 
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
class AuthController {

    private final AuthService service;
    private final JwtUtil jwtUtil;

    AuthController(AuthService service,JwtUtil jwtUtil){
        this.service = service;
        this.jwtUtil = jwtUtil;
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
    @PostMapping("/auth/login")
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
        
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
        }

        User user = userOptional.get();

        // Generate JWT token 
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "token", token,
            "firstName", user.getFirstName(),
            "lastName", user.getLastName(),
            "email", user.getEmail()
        ));
    }

    
}
