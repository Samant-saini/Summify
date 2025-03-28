package com.example.AIAssistant;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)// igonre unknown properties instead of giving error
public class GeminiResponse {
    public List<Candidate> candidates;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Candidate {
        private Content content;
    }
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public  static class Content {
        private List<Part> parts;
    }
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public  static class Part {
        private String text;
    }
}
