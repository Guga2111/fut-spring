package com.guga.futspring.service;

import com.guga.futspring.entity.Message;

import java.util.List;

public interface MessageService {
    Message sendMessage(Long peladaId, Long senderId, String content);
    List<Message> getPeladaMessages(Long peladaId);
}
