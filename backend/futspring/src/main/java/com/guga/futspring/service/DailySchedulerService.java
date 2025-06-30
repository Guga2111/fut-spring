package com.guga.futspring.service;

import com.guga.futspring.entity.Daily;
import com.guga.futspring.entity.LeagueTable;
import com.guga.futspring.entity.Pelada;
import com.guga.futspring.entity.enums.DailyStatus;
import com.guga.futspring.repository.DailyRepository;
import com.guga.futspring.repository.LeagueTableRepository;
import com.guga.futspring.repository.PeladaRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DailySchedulerService {

    PeladaRepository peladaRepository;
    DailyRepository dailyRepository;
    LeagueTableRepository leagueTableRepository;

    //em deploy alterar cron para 0 0 0 * * ? a cada 24 hrs, o de teste esta a cada 10 segundos
    @Scheduled(cron = "0/10 * * * * ?")
    public void criarDailySemanalmente() {
        System.out.println("Executando scheduler para criar Daily em: " + LocalDateTime.now());

        List<Pelada> peladasAtivas = peladaRepository.findByAutoCreateDailyEnabledTrue();

        for (Pelada pelada : peladasAtivas) {
            if (pelada.getDayOfWeek() == null || pelada.getTimeOfDay() == null) {
                System.err.println("Pelada " + pelada.getName() + " (ID: " + pelada.getId() +
                        ") está com agendamento automático ativo, mas não tem 'Dia da Semana' ou 'Hora do Dia' configurados. Ignorando.");
                continue;
            }

            LocalDate dateToHappen = LocalDate.now();

            dateToHappen = dateToHappen.with(TemporalAdjusters.next(pelada.getDayOfWeek()));

            LocalDateTime dateDailyHour = LocalDateTime.of(dateToHappen, pelada.getTimeOfDay());

            LocalDateTime dataCreationLimit = dateDailyHour.minusHours(24);

            System.out.println("Pelada: " + pelada.getName() +
                    ", Daily ocorrerá em: " + dateDailyHour +
                    ", Limite de criação: " + dataCreationLimit +
                    ", Agora: " + LocalDateTime.now());

            if (LocalDateTime.now().isAfter(dataCreationLimit)) {

                Optional<Daily> existingDaily = dailyRepository.findByPeladaAndDailyDate(pelada, dateToHappen);

                if (existingDaily.isEmpty()) {
                    try {
                        Daily novaDaily = new Daily();
                        novaDaily.setPelada(pelada);
                        novaDaily.setDailyDate(dateToHappen);
                        novaDaily.setDailyTime(pelada.getTimeOfDay());
                        novaDaily.setCreationDateTime(LocalDateTime.now());
                        novaDaily.setIsFinished(false);
                        novaDaily.setStatus(DailyStatus.SCHEDULED);

                        Daily savedDaily = dailyRepository.save(novaDaily);

                        LeagueTable newLeagueTable = new LeagueTable();
                        newLeagueTable.setDaily(savedDaily);
                        newLeagueTable.setEntries(new ArrayList<>());
                        leagueTableRepository.save(newLeagueTable);

                        System.out.println("Daily CRIADA para a Pelada: " + pelada.getName() +
                                " em " + dateToHappen + " às " + pelada.getTimeOfDay());
                    } catch (Exception e) {
                        System.err.println("Erro ao criar Daily para a Pelada " + pelada.getName() + ": " + e.getMessage());
                    }
                } else {
                    System.out.println("Daily para a Pelada " + pelada.getName() +
                            " em " + dateToHappen + " já EXISTE. Não será criada novamente.");
                }
            } else {
                System.out.println("Daily para a Pelada " + pelada.getName() +
                        " em " + dateToHappen + " ainda NÃO atingiu o limite de criação (24h antes).");
            }
        }
    }

    // --- MÉTODO PARA TESTE MANUAL (REMOVER EM PRODUÇÃO!) ---
    public String runSchedulerManually() {
        System.out.println("Scheduler de Daily disparado manualmente em: " + LocalDateTime.now());
        criarDailySemanalmente(); // Chama o método principal do scheduler
        return "Scheduler de Daily executado com sucesso!";
    }
}
