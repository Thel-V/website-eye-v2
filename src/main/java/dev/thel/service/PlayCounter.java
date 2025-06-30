package dev.thel.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class PlayCounter {
    private static final Path COUNTER_FILE = Paths.get("C:\\Users\\ruder\\Desktop\\IHK Material\\Projekt\\Hoerfrei\\data\\playcounter.txt");
    private static final Map<String, Integer> counts = new HashMap<>();

    static {
        loadCounts();
    }

    private static void loadCounts() {
        try {
            if (Files.exists(COUNTER_FILE)) {
                Files.lines(COUNTER_FILE)
                        .forEach(line -> {
                            // Handle both formats (with or without spaces)
                            String normalizedLine = line.replace(" | ", "|");
                            int equalSign = normalizedLine.indexOf('=');
                            if (equalSign > 0) {
                                String key = normalizedLine.substring(0, equalSign);
                                String value = normalizedLine.substring(equalSign + 1);
                                try {
                                    counts.put(key, Integer.parseInt(value));
                                } catch (NumberFormatException e) {
                                    System.err.println("Invalid count format: " + key);
                                }
                            }
                        });
            }
        } catch (IOException e) {
            System.err.println("Error loading counts: " + e.getMessage());
        }
    }

    public static synchronized void increment(String title, String author) throws IOException {
        String key = createKey(title, author);
        counts.put(key, getCount(title, author) + 1);
        saveAllCounts();
    }

    private static void saveAllCounts() throws IOException {
        StringBuilder content = new StringBuilder();
        counts.forEach((key, count) -> {
            // Convert internal key to display format
            String displayKey = key.replace("|", " | ");
            content.append(displayKey).append("=").append(count).append("\n");
        });
        Files.write(COUNTER_FILE, content.toString().getBytes());
    }

    public static int getCount(String title, String author) {
        return counts.getOrDefault(createKey(title, author), 0);
    }

    private static String createKey(String title, String author) {
        // Normalize without spaces first (for internal matching)
        String normalizedKey = title.trim()
                    .replace("\n", " ")
                    .replace("=", "-")
                + "|" +
                author.trim()
                    .replace("\n", " ")
                    .replace("=", "-");

        // Return formatted version with spaces for display/storage
        return normalizedKey.replace("|", " | ");
    }
}