package com.guga.futspring.exception;

public class TeamNotFoundInLeagueTableException extends RuntimeException{
    public TeamNotFoundInLeagueTableException(Long dailyId, Long teamId) {
        super("Team with ID '"+ teamId + "' not found in LeagueTable for Daily ID '"+ dailyId + "'");
    }
}
