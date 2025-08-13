package com.guga.futspring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Arrays;

@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StatsNotFoundException.class)
    public ResponseEntity<Object> handleStatsNotFoundException(StatsNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PeladaNotFoundException.class)
    public ResponseEntity<Object> handlePeladaNotFoundException(PeladaNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyPlayerAssociatedException.class)
    public ResponseEntity<Object> handleAlreadyPlayerAssociatedException(AlreadyPlayerAssociatedException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AlreadyPlayerInDailyException.class)
    public ResponseEntity<Object> handleAlreadyPlayerInDailyException(AlreadyPlayerInDailyException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PlayerNotInPeladaException.class)
    public ResponseEntity<Object> handlePlayerNotInPeladaException(PlayerNotInPeladaException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DailyNotFoundException.class)
    public ResponseEntity<Object> handleDailyNotFoundException(DailyNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotSuficientPlayersToSortTeamsException.class)
    public ResponseEntity<Object> handleNotSuficientPlayersToSortTeamsException(NotSuficientPlayersToSortTeamsException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(MatchNotFoundException.class)
    public ResponseEntity<Object> handleMatchNotFoundException(MatchNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RankingNotFoundForPelada.class)
    public ResponseEntity<Object> handleRankingNotFoundForPelada(RankingNotFoundForPelada e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(DailyInThatDateAlreadyInThatPeladaException.class)
    public ResponseEntity<Object> handleDailyInThatDateAlreadyInThatPeladaException(DailyInThatDateAlreadyInThatPeladaException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(LeagueTableNotFoundException.class)
    public ResponseEntity<Object> handleLeagueTableNotFoundException(LeagueTableNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TeamNotFoundInLeagueTableException.class)
    public ResponseEntity<Object> handleTeamNotFoundInLeagueTableException(TeamNotFoundInLeagueTableException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyDailyFinishedException.class)
    public ResponseEntity<Object> handleAlreadyDailyFinishedException(AlreadyDailyFinishedException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MaximumPlayersOnDailyException.class)
    public ResponseEntity<Object> handleMaximumPlayersOnDailyException(MaximumPlayersOnDailyException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EmailAlreadyHaveException.class)
    public ResponseEntity<Object> handleEmailAlreadyHaveException(EmailAlreadyHaveException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UsernameAlreadyHaveException.class)
    public ResponseEntity<Object> handleUsernameAlreadyHaveException(UsernameAlreadyHaveException e) {
        ErrorResponse errorResponse = new ErrorResponse(Arrays.asList(e.getLocalizedMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }
}
