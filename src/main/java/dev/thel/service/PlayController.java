package dev.thel.service;

import dev.thel.service.PlayCounter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class PlayController {

    @PostMapping("/count-play")
    @ResponseBody
    public String countPlay(@RequestParam String title, @RequestParam String author) {
        try {
            PlayCounter.counter(title, author);
            return "OK";
        } catch (IOException e) {
            return "ERROR";
        }
    }
}