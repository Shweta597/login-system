package com.shwetashaw.loginsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Map;

@RestController
public class FileUploadController {

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            Principal principal) {  // ✅ contains logged-in user from JWT

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }

        try {
            // Example: save file locally (you can store in DB or cloud)
            String uploadDir = "uploads/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + fileName;

            // ✅ return file URL to frontend
            return ResponseEntity.ok(Map.of("fileUrl", fileUrl));

        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "File upload failed"));
        }
    }
}
