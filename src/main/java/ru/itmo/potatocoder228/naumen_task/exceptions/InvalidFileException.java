package ru.itmo.potatocoder228.naumen_task.exceptions;

public class InvalidFileException extends RuntimeException {
    private String message;

    public InvalidFileException(String err) {
        super(err);
        message = err;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
