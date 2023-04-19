package ru.itmo.potatocoder228.naumen_task.services;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import ru.itmo.potatocoder228.naumen_task.dto.PersonRequestDto;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;
import ru.itmo.potatocoder228.naumen_task.repo.PersonRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PersonService {

    private final String SERVICE_URL = "https://api.agify.io/?name=";
    private PersonRepository dao;

    public String clearDb() {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        dao.deleteAll(listOfPersonsByUser);
        return "Записи удалены из БД";
    }

    public List<PersonEntity> getFirstTenPeoples() {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        for (int i = 0; i < 10 && listOfPersonsByUser.size() > i; i++) {
            response.add(listOfPersonsByUser.get(i));
        }
        response.sort((a, b) -> {
            return a.getAge() > b.getAge() ? 1 : -1;
        });
        return response;
    }

    public List<PersonEntity> getNextTenPeoples(PersonRequestDto dto) {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        int buf = listOfPersonsByUser.size();
        if(buf == 0) buf = 1;
        for (int i = dto.getCurrentIndex(); i < ((dto.getCurrentIndex() + 10)%buf); i++) {
            response.add(listOfPersonsByUser.get(i));
        }
        return response;
    }

    public List<PersonEntity> getPrevTenPeoples(PersonRequestDto dto) {
        List<PersonEntity> listOfPersonsByUser = dao.findAll();
        List<PersonEntity> response = new ArrayList<>();
        int mod = listOfPersonsByUser.size();
        if(mod==0) mod = 1;
        int buf = dto.getCurrentIndex()%mod;
        for (int i = buf; i > (buf-10)&&i>=0; i--) {
                response.add(listOfPersonsByUser.get(i));
        }
        return response;
    }

    public String addPeoples(List<PersonEntity> newPersons) {
        dao.saveAll(newPersons);
        dao.flush();
        return "Имена в БД обновлены";
    }

    public Integer getPersonAge(PersonRequestDto dto) throws IOException, ParseException {
        PersonEntity person = dao.findByName(dto.getName());
        String GET_URL = SERVICE_URL + dto.getName();
        if (person == null) {
            URL obj = new URL(GET_URL);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("User-Agent", HttpHeaders.USER_AGENT);
            if (con.getResponseCode() == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(response.toString());
                Integer buf = (Integer) json.get("age");
                buf = (buf != null) ? buf : Integer.valueOf(0);
                return buf;
            }
        } else {
            dao.delete(person);
            Long buf = person.getRequests();
            buf++;
            person.setRequests(buf);
            dao.save(person);
            return person.getAge();
        }
        return 0;
    }
}
