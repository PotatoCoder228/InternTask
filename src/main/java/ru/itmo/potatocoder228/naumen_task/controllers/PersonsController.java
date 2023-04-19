package ru.itmo.potatocoder228.naumen_task.controllers;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.itmo.potatocoder228.naumen_task.dto.FileResponseDto;
import ru.itmo.potatocoder228.naumen_task.dto.PersonRequestDto;
import ru.itmo.potatocoder228.naumen_task.dto.ResponseDto;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidFileException;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidParseException;
import ru.itmo.potatocoder228.naumen_task.services.PersonService;
import ru.itmo.potatocoder228.naumen_task.utils.Parser;

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
    public ResponseDto getPersonAge(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        newDto.setPersonAge(personService.getPersonAge(dto));
        return newDto;
    }

    @PostMapping("/previous")
    public ResponseDto getPrevTenPersons(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        newDto.setPersons(personService.getPrevTenPeoples(dto));
        return newDto;
    }

    @PostMapping("/update")
    public ResponseDto uploadPersonsToDb(@RequestBody FileResponseDto dto, @RequestParam("file") MultipartFile file) {
        ResponseDto newDto = new ResponseDto();
        Parser parser = new Parser(file);
        boolean flag = parser.downloadFile();
        if (flag) {
            newDto.setResponse("Данные обновлены");
            parser.parseFile();
            personService.clearDb();
        } else {
            throw new InvalidFileException("Не удалось загрузить файл!");
        }
        return newDto;
    }

    @PostMapping("/clear")
    public ResponseDto clearPersonsFromDb(@RequestBody PersonRequestDto dto) {
        ResponseDto newDto = new ResponseDto();
        newDto.setResponse(personService.clearDb());
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
}
