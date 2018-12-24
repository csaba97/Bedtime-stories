package com.devglan.service;

import com.devglan.model.User;
import com.devglan.model.UserDto;

import java.util.List;

public interface UserService {

    User save(UserDto user);
    List<User> findAll();
    void delete(long id);
    User findByUsername(String username);
    User findByEmail(String email);
    User findById(Long id);
}
