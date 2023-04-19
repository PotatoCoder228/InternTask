package ru.itmo.potatocoder228.naumen_task.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FileResponseDto {
    private String filename;
    private MultipartFile file;
}
