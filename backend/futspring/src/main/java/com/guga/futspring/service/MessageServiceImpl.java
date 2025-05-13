package com.guga.futspring.service;

import com.guga.futspring.entity.Message;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.PeladaNotFoundException;
import com.guga.futspring.exception.PlayerNotInPeladaException;
import com.guga.futspring.exception.UserNotFoundException;
import com.guga.futspring.repository.MessageRepository;
import com.guga.futspring.repository.PeladaRepository;
import com.guga.futspring.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService{

    MessageRepository messageRepository;
    PeladaRepository peladaRepository;
    UserRepository userRepository;

    @Override
    public Message sendMessage(Long peladaId, Long senderId, String content) {

        Optional<Pelada> pelada = peladaRepository.findById(peladaId);
        Optional<User> user = userRepository.findById(senderId);

        if(pelada.isEmpty()) throw new PeladaNotFoundException(peladaId);
        if(user.isEmpty()) throw new UserNotFoundException(senderId);

        Pelada unwrapedPelada = pelada.get();
        User unwrapedUser = user.get();

        if(!unwrapedPelada.getPlayers().contains(unwrapedUser)) throw new PlayerNotInPeladaException(senderId, peladaId);

        Message message = new Message();
        message.setContent(content);
        message.setSentAt(LocalDateTime.now());
        message.setPelada(unwrapedPelada);
        message.setSender(unwrapedUser);

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getPeladaMessages(Long peladaId) {
        return messageRepository.findByPeladaIdOrderBySentAtAsc(peladaId);
    }
}
