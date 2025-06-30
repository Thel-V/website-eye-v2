package dev.thel.service;

import java.time.LocalDate;

public class Song {
    private final String title;
    private final String author;
    private final String imageUrl;
    private final String audioUrl;
    private final LocalDate publishingDate;

    public Song(String title, String author, String imageUrl, String audioUrl, LocalDate publishingDate) {
        this.title = title;
        this.author = author;
        this.imageUrl = imageUrl;
        this.audioUrl = audioUrl;
        this.publishingDate = publishingDate;
    }

    // Getters (unchanged)
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getImageUrl() { return imageUrl; }
    public String getAudioUrl() { return audioUrl; }
    public LocalDate getPublishingDate() { return publishingDate; }

    public int getPlayCount() {
        return PlayCounter.getCount(this.title, this.author);
    }

    public String getJsSafeTitle() {
        return escapeForJs(title);
    }

    public String getJsSafeAuthor() {
        return escapeForJs(author);
    }

    private String escapeForJs(String input) {
        if (input == null) return "";
        return input.replace("\\", "\\\\")
                .replace("'", "\\'")
                .replace("\"", "\\\"");
    }
}