package ru.itmo.potatocoder228.naumen_task.dto;

import lombok.*;
import ru.itmo.potatocoder228.naumen_task.entities.PersonEntity;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseDto {
    private String response;

    private Integer personAge;

    private List<PersonEntity> persons;
}
