package com.guga.futspring.controller;

import com.guga.futspring.entity.Message;
import com.guga.futspring.service.MessageServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/chat")
public class MessageController {
    MessageServiceImpl messageService;

    @PostMapping("/pelada/{peladaId}/send/{senderId}")
    public ResponseEntity<Message> sendMessage(@PathVariable Long peladaId, @PathVariable Long senderId, @RequestBody Map<String, String> requestBody) {
        String content = requestBody.get("content");
        Message message = messageService.sendMessage(peladaId, senderId, content);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @GetMapping("/pelada/{peladaId}/messages")
    public ResponseEntity<List<Message>> getPeladaMessages(@PathVariable Long peladaId) {
        return new ResponseEntity<>(messageService.getPeladaMessages(peladaId), HttpStatus.OK);
    }
}
