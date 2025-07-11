package dev.thel.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SongList {

    private static final List<Song> SONGS = new ArrayList<>();

    static { // https://pixabay.com/
        SONGS.add(new Song("Church Choir", "NNChannel","song-images/church-choir.png", "nnchanel-church-choir.mp3", LocalDate.of(2025, 5, 2)));
        SONGS.add(new Song("Regina Caeli Prayer", "nickpanek620", "song-images/regina-caeli-prayer.png", "nickpanek620-regina-caeli-prayer.mp3", LocalDate.of(2025, 5, 15)));
        SONGS.add(new Song("rebel.exe", "nickpanek620", "song-images/rebel-exe.png", "nickpanek620-rebel_exe.mp3", LocalDate.of(2025, 4, 17)));
        SONGS.add(new Song("Heavy Rain", "nickpanek620", "song-images/heavy-rain.png", "nickpanek620-heavy-rain.mp3", LocalDate.of(2025, 5, 5)));
        SONGS.add(new Song("Jazz Lounge", "lkoliks", "song-images/jazz-lounge.png", "lkoliks-jazz-lounge.mp3", LocalDate.of(2025, 4, 29)));
        SONGS.add(new Song("Silent Waves", "i_Fisher", "song-images/silent-waves.png", "i_fisher-silent-waves.mp3", LocalDate.of(2025, 4, 29)));
        SONGS.add(new Song("Lounge Jazz", "HitsLab", "song-images/lounge-jazz.png", "hitslab-lounge-jazz.mp3", LocalDate.of(2025, 4, 14)));
        SONGS.add(new Song("Inner Peace", "Grand_Project", "song-images/inner-peace.png", "grand_project-inner-peace.mp3", LocalDate.of(2025, 5, 12)));
        SONGS.add(new Song("Whispers", "AmarantaMusic", "song-images/whispers.png", "amarantamusic-whispers.mp3", LocalDate.of(2025, 5, 1)));
        SONGS.add(new Song("Rain's Farewell", "AmarantaMusic", "song-images/rains-farewell.png", "amarantamusic-rains-farewell.mp3", LocalDate.of(2025, 5, 9)));
    }

    public static List<Song> getSortedByPopularity(int count) {
        List<Song> copy = new ArrayList<>(SONGS);
        copy.sort((song1, song2) -> {
            int plays1 = PlayCounter.getCount(song1.getTitle(), song1.getAuthor());
            int plays2 = PlayCounter.getCount(song2.getTitle(), song2.getAuthor());
            return Integer.compare(plays2, plays1); // Descending order
        });
        return copy.subList(0, Math.min(count, copy.size()));
    }

    public static List<Song> getRandomSongs(int count) {
        List<Song> copy = new ArrayList<>(SONGS);
        Collections.shuffle(copy);
        return copy.subList(0, Math.min(count, copy.size()));
    }

    public static List<Song> getSortedByDate(int count) {
        List<Song> copy = new ArrayList<>(SONGS);
        copy.sort(Comparator.comparing(Song::getPublishingDate).reversed());
        return copy.subList(0, Math.min(count, copy.size()));
    }

    public static List<Song> getAllSongs() {
        return new ArrayList<>(SONGS);
    }
}
