package com.portfolio.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class DataService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public <T> List<T> loadList(String fileName, TypeReference<List<T>> typeRef) throws IOException {
        ClassPathResource resource = new ClassPathResource("data/" + fileName);
        return objectMapper.readValue(resource.getInputStream(), typeRef);
    }

    public <T> T loadObject(String fileName, Class<T> clazz) throws IOException {
        ClassPathResource resource = new ClassPathResource("data/" + fileName);
        return objectMapper.readValue(resource.getInputStream(), clazz);
    }
}
