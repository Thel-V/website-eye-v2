package dev.thel.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class PlayCounter {
    private static final Path COUNTER_FILE = Paths.get("src", "data", "playcounter.txt");
    private static final Map<String, Integer> counts = new HashMap<>();

    static {
        loadCounts();
    }

    private static void loadCounts() {
        try {
            if (Files.exists(COUNTER_FILE)) {
                Files.lines(COUNTER_FILE).forEach(line -> {
                    String normalizedLine = line.replace(" | ", "|")
                                                .replace(" = ", "=");
                    int equalSign = normalizedLine.indexOf('=');
                    if (equalSign > 0) {
                        String info = normalizedLine.substring(0, equalSign);
                        String value = normalizedLine.substring(equalSign + 1); // Value = Count
                        try {
                            counts.put(info, Integer.parseInt(value));
                        }
                        catch (NumberFormatException e) {}
                    }
                });
            }
        }
        catch (IOException e) {}
    }

    public static synchronized void counter(String title, String author) throws IOException {
        String key = createKey(title, author);
        counts.put(key, getCount(title, author) + 1);
        saveAllCounts();
    }

    private static void saveAllCounts() throws IOException {
        List<String> lines = counts.entrySet().stream()
        .map(entry -> entry.getKey().replace("|", " | ") + " = " + entry.getValue())
        .collect(Collectors.toList());
        Files.write(COUNTER_FILE, lines);
    }

    public static int getCount(String title, String author) {
        return counts.getOrDefault(createKey(title, author), 0);
    }

    private static String createKey(String title, String author) {
        String normalizedKey = title.trim()
                    .replace("\n", " ")
                    .replace("=", "-")
                + "|" +
                author.trim()
                    .replace("\n", " ")
                    .replace("=", "-");

        return normalizedKey.replace("|", " | ");
    } //probs a name change
}