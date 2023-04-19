package ru.itmo.potatocoder228.naumen_task.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.itmo.potatocoder228.naumen_task.dto.PersonRequestDto;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;
import ru.itmo.potatocoder228.naumen_task.repo.PersonRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PersonService {

    private PersonRepository dao;

    public String clearDb() {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        dao.deleteAll(listOfPersonsByUser);
        return "Записи удалены из БД";
    }

    public List<PersonEntity> getFirstTenPeoples() {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        for (int i = 0; i < 10&&listOfPersonsByUser.size()>i; i++) {
            response.add(listOfPersonsByUser.get(i));
        }
        return response;
    }

    public List<PersonEntity> getNextTenPeoples(PersonRequestDto dto) {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        for (int i = 0; i < dto.getCurrentIndex() + 10&&listOfPersonsByUser.size()>i; i++) {
            response.add(listOfPersonsByUser.get(i));
        }
        return response;
    }

    public List<PersonEntity> getPrevTenPeoples(PersonRequestDto dto) {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        if (dto.getCurrentIndex() < 10) {
            for (int i = 0; i < 10; i++) {
                response.add(listOfPersonsByUser.get(i));
            }
        } else {
            for (int i = dto.getCurrentIndex(); i > dto.getCurrentIndex() - 10; i--) {
                response.add(listOfPersonsByUser.get(i));
            }
        }
        return response;
    }

    public String addPeoples(List<PersonEntity> newPersons) {
        dao.saveAll(newPersons);
        dao.flush();
        return "Имена в БД обновлены";
    }

    public Integer getPersonAge(PersonRequestDto dto) {
        PersonEntity person = dao.findByName(dto.getName());
        dao.delete(person);
        Long buf = person.getRequests();
        buf++;
        person.setRequests(buf);
        dao.save(person);
        return person.getAge();
    }
}
