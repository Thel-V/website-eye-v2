package dev.thel.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
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
                    int equalsIndex = line.indexOf('=');
                    int pipeIndex = line.indexOf('|');

                    if (pipeIndex > 0 && equalsIndex > pipeIndex) {
                        String key = line.substring(0, equalsIndex);
                        String valueStr = line.substring(equalsIndex + 1);

                        try {
                            counts.put(key, Integer.parseInt(valueStr));
                        } catch (NumberFormatException ignored) {}
                    }
                });
            }
        } catch (IOException ignored) {}
    }

    private static void saveCounts() throws IOException {
        List<String> lines = counts.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.toList());
        Files.write(COUNTER_FILE, lines);
    }

    private static String lineCleaner(String artist, String song) {
        String cleanedArtist = artist.trim().replaceAll("\\s+", "_").replaceAll("=", "-");
        String cleanedSong = song.trim().replaceAll("\\s+", "_").replaceAll("=", "-");

        return cleanedArtist + "|" + cleanedSong;
    }

    public static synchronized void counter(String artist, String song) throws IOException {
        String key = lineCleaner(artist, song);
        int currentCount = counts.getOrDefault(key, 0);
        counts.put(key, currentCount + 1);
        saveCounts();
    }

    public static int getCount(String artist, String song) {
        return counts.getOrDefault(lineCleaner(artist, song), 0);
    }
}