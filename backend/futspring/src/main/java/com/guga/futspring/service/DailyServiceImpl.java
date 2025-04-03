package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.User;
import com.guga.futspring.exception.AlreadyPlayerInDailyException;
import com.guga.futspring.exception.PlayerNotInPeladaException;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.PeladaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DailyServiceImpl implements DailyService{

    DailyRepository dailyRepository;
    PeladaServiceImpl peladaService;
    UserServiceImpl userService;
    PeladaRepository peladaRepository;

    @Override
    public Daily getDaily(Long id) {
        Optional<Daily> daily = dailyRepository.findById(id);
        return unwrapDaily(daily, id);
    }

    @Override
    public List<Daily> getDailys() {
        return (List<Daily>) dailyRepository.findAll();
    }

    @Override
    public Daily createDaily(Daily daily, Long peladaId) {
        Pelada pelada = peladaService.getPelada(peladaId);
        pelada.getDailies().add(daily);
        peladaRepository.save(pelada);
        daily.setPelada(pelada);
        return dailyRepository.save(daily);
    }

    @Override
    public Daily confirmPresenceInDaily(Long dailyId, Long playerId) {

        User player = userService.getUser(playerId);
        Daily daily = getDaily(dailyId);

        validatePresence(daily, player);

        daily.getPlayersPresence().add(player); 

        return dailyRepository.save(daily);
    }

    @Override
    public Daily updateDaily() {
        return null;
    }

    static void validatePresence(Daily daily, User player) {
        if (daily.getPlayersPresence().contains(player)) {
            throw new AlreadyPlayerInDailyException(player.getId());
        }

        if (!daily.getPelada().getPlayers().contains(player)) {
            throw new PlayerNotInPeladaException(player.getId(), daily.getPelada().getId());
        }
    }

    @Override
    public void removeDaily(Long id) {
        dailyRepository.deleteById(id);
    }

    static Daily unwrapDaily(Optional<Daily> entity, Long id) {
        if(entity.isPresent()) return entity.get();
        else throw new RuntimeException();
    }
}
