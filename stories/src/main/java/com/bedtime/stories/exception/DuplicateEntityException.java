package com.bedtime.stories.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FOUND)
public class DuplicateEntityException extends RuntimeException {

    public DuplicateEntityException(String exception) {
        super(exception);
    }
}
