package ru.itmo.potatocoder228.naumen_task.utils;

import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidFileException;
import ru.itmo.potatocoder228.naumen_task.exceptions.InvalidParseException;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Pattern;

import static java.nio.file.Files.deleteIfExists;

@AllArgsConstructor
public class Parser {
    private MultipartFile file;

    public boolean downloadFile() {
        if (!this.file.isEmpty()) {
            try {
                byte[] bytes = this.file.getBytes();
                deleteIfExists(Paths.get("uploaded"));
                File uploadedFile = new File("uploaded");
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(uploadedFile));
                stream.write(bytes);
                stream.close();
                return true;
            } catch (IOException e) {
                return false;
            }
        }
        return false;
    }

    public List<PersonEntity> parseFile() {
        try {
            List<PersonEntity> personsList = new ArrayList<>();
            Scanner scanner = new Scanner(new File("uploaded"));
            while (scanner.hasNext()) {
                String newline = scanner.nextLine();
                String pattern = "^([А-ЯЁ]|[A-Z])((([a-z]|[а-яё])+_\\d+$)|_\\S+$)";
                boolean isValid = Pattern.matches(pattern, newline);
                if (!isValid) {
                    throw new InvalidFileException("Невалидная строка в файле:" + newline);
                }
                String[] person = newline.split("_");
                Integer age = Integer.parseInt(person[1]);
                PersonEntity entity = new PersonEntity();
                entity.setAge(age);
                entity.setRequests(0L);
                entity.setName(person[0]);
                personsList.add(entity);
            }
            scanner.close();
            return personsList;
        } catch (IOException e) {
            throw new InvalidParseException("Не удалось распарсить файл");
        }
    }
}
