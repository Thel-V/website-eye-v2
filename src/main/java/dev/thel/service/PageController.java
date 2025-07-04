package dev.thel.service;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpSession;

@Controller
public class PageController {

    @GetMapping("/")
    public String redirectToHome() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String home(HttpSession session, Model model) {
        model.addAttribute("randomSongs", SongList.getRandomSongs(10)); // <-- THE COUNT OF THE SONGS DISPLAYED1!!!
        model.addAttribute("popularSongs", SongList.getSortedByPopularity(10));
        model.addAttribute("newSongs", SongList.getSortedByDate(10));
        return "home";
    }

    @GetMapping("/discover")
    public String discover(HttpSession session, Model model) { return "discover"; }

    @GetMapping("/support")
    public String support(HttpSession session, Model model) {
        return "support";
    }

    @GetMapping("/contact")
    public String contact(HttpSession session, Model model) {
        return "contact";
    }

    @GetMapping("/underconstruct")
    public String underconstruct(HttpSession session, Model model) {
        return "underconstruct";
    }
}
