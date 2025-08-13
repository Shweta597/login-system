package com.shwetashaw.loginsystem.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
class HomeController {

    @GetMapping("/")
    public String hello(){
        return "Hello from home page";
    }

    
}