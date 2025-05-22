package com.guga.futspring.entity.enums; // Ou um pacote 'enums'

public enum DailyStatus {
    SCHEDULED,      // Criada pelo scheduler ou manualmente, aguardando confirmações
    CONFIRMED,    // Jogadores suficientes confirmaram presença
    IN_COURSE,  // A pelada está acontecendo (opcional, pode ser baseada na hora)
    FINISHED,    // A pelada terminou, resultados e prêmios definidos
    CANCELED      // A pelada foi cancelada
}