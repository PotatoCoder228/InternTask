package ru.itmo.potatocoder228.naumen_task.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {
    @Override
    List<PersonEntity> findAll();

    PersonEntity findByName(String user);

    @Override
    void deleteAll();
}