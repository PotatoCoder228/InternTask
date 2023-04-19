package ru.itmo.potatocoder228.naumen_task.controllers;


import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import net.minidev.json.parser.ParseException;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import ru.itmo.potatocoder228.naumen_task.dto.PersonRequestDto;
import ru.itmo.potatocoder228.naumen_task.dto.ResponseDto;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidFileException;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidParseException;
import ru.itmo.potatocoder228.naumen_task.services.PersonService;
import ru.itmo.potatocoder228.naumen_task.utils.Parser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class PersonsController {

    private PersonService personService;

    @PostMapping("/next")
    public ResponseDto getNextTenPersons(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        newDto.setPersons(personService.getNextTenPeoples(dto));
        return newDto;
    }

    @PostMapping("/person")
    public ResponseDto getPersonAge(@RequestBody PersonRequestDto dto) throws IOException, ParseException {
        ResponseDto newDto = new ResponseDto();
        newDto.setPersonAge(personService.getPersonAge(dto));
        List<PersonEntity> list = personService.getNextTenPeoples(dto);
        list.sort((a, b) -> {
                return a.getAge() > b.getAge() ? -1 : 1;
            });
        newDto.setPersons(list);
        return newDto;
    }

    @PostMapping("/previous")
    public ResponseDto getPrevTenPersons(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        List<PersonEntity> list = personService.getPrevTenPeoples(dto);
        list.sort((a, b) -> {
                return a.getAge() > b.getAge() ? -1 : 1;
            });
        newDto.setPersons(list);
        return newDto;
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseDto updatePersonsToDb(HttpServletRequest request) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile file = multipartRequest.getFile("customFile");
        System.out.println(file.getName());
        ResponseDto newDto = new ResponseDto();
        Parser parser = new Parser(file);
        boolean flag = parser.downloadFile();
        if (flag) {
            newDto.setResponse("Данные обновлены");
            List<PersonEntity> persons = parser.parseFile();
            personService.clearDb();
            newDto.setResponse(personService.addPeoples(persons));
            List<PersonEntity> responseList = new ArrayList<>();
            for (int i = 0; i < persons.size() && i < 10; i++) {
                responseList.add(persons.get(i));
            }
            responseList.sort((a, b) -> {
                return a.getAge() > b.getAge() ? -1 : 1;
            });
            newDto.setPersons(responseList);
        } else {
            throw new InvalidFileException("Не удалось загрузить файл!");
        }
        return newDto;
    }

    @PostMapping("/clear")
    public ResponseDto clearPersonsFromDb(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        newDto.setResponse(personService.clearDb());
        List<PersonEntity> list = personService.getNextTenPeoples(dto);
        list.sort((a, b) -> {
            return a.getAge() > b.getAge() ? -1 : 1;
        });
        newDto.setPersons(list);
        return newDto;
    }

    @ExceptionHandler(InvalidFileException.class)
    ResponseEntity<ResponseDto> invalidFileException(InvalidFileException exception) {
        ResponseDto response = new ResponseDto();
        response.setResponse(exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(InvalidParseException.class)
    ResponseEntity<ResponseDto> invalidParseException(InvalidParseException exception) {
        ResponseDto response = new ResponseDto();
        response.setResponse(exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(PSQLException.class)
    ResponseEntity<ResponseDto> PSQLException(PSQLException exception) {
        ResponseDto response = new ResponseDto();
        response.setResponse(exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
    @ExceptionHandler(NullPointerException.class)
    ResponseEntity<ResponseDto> NullPointerException(NullPointerException exception) {
        ResponseDto response = new ResponseDto();
        response.setResponse(exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}
