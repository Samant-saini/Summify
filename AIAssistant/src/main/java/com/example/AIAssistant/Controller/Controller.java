package com.example.AIAssistant.Controller;


import com.example.AIAssistant.Request;
import com.example.AIAssistant.Services.Services;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins="*")
@AllArgsConstructor
public class Controller {
    @Autowired
    private final Services services;


    @PostMapping("/process")
    public ResponseEntity<String> processContent(@RequestBody Request request){
        String result=services.processContent(request);
        return ResponseEntity.ok(result);
    }

}
