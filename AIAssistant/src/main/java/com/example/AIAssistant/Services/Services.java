package com.example.AIAssistant.Services;

import com.example.AIAssistant.GeminiResponse;
import com.example.AIAssistant.Request;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class Services{  // Renamed class for better convention

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;// object mapper will do that it will map the response to the gemini respone way

    public Services(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String processContent(Request request) {
        String prompt = buildPrompt(request);
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", prompt)
                        })
                }
        );

        String response=webClient.post()
                .uri(geminiApiUrl+geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        return extractTextFromResponse(response);
//        return prompt;  // Placeholder: Replace with actual API response
    }
    private String extractTextFromResponse(String response){
        try{
            GeminiResponse geminiResponse=objectMapper.readValue(response,GeminiResponse.class);
            if(geminiResponse.getCandidates()!=null && !geminiResponse.getCandidates().isEmpty()){
                GeminiResponse.Candidate firstCandidate=geminiResponse.getCandidates().get(0);

                    if (firstCandidate.getContent() != null && firstCandidate.getContent().getParts()!=null &&
                            !firstCandidate.getContent().getParts().isEmpty()){
                        return firstCandidate.getContent().getParts().get(0).getText();

                    }


            }
            return "No content found in response";

        }
        catch(Exception e){
            return "error"+e.getMessage();
        }
    }

    private String buildPrompt(Request request) {
        StringBuilder prompt = new StringBuilder();
        switch (request.getOperation()) {
            case "summarize":
                prompt.append("Provide a clear and concise summary of the following text in a few sentences:\n\n");
                break;
            case "suggest":
                prompt.append("Provide a suggestion of the content:\n\n");
                break;
            default:
                throw new IllegalArgumentException("Unknown operation: " + request.getOperation());
        }
        prompt.append(request.getContent());
        return prompt.toString();
    }
}
