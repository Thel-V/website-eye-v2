<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/pictures/logo.ico" type="image/x-icon">
    
    <title>Hoerfrei/discover</title>
    <link rel="stylesheet" href="/css/discover.css">
    <script src="/js/discover.js" defer></script>

</head>

<body>
    <header>
        <div class="right">
            <div class="logo">
                <a href="/home">
                    <img src="/pictures/logo-q.png" alt="">
                </a>
            </div>
            <div class="line"></div>
            <div class="slogan">
                <b>Die all-in-one Platform für Urheberrechtsfreie Musik.</b>
            </div>
        </div>

        <nav>
            <ul>
                <div class="nav-w-dots">
                    <div class="fields" id="nav-home-field">
                        <div class="dots" id="nav-home-dot"></div>
                        <li><a href="/home" id="nav-home-button">Start</a></li>
                    </div>
                    <div class="fields" id="nav-discover-field">
                        <div class="dots" id="nav-discover-dot"></div>
                        <li><a href="/discover" id="nav-discover-button">Entdecken</a></li>
                    </div>
                    <div class="fields" id="nav-profile-field">
                        <div class="dots" id="nav-profile-dot"></div>
                        <li><a href="/profile" id="nav-profile-button">Profil</a></li>
                    </div>
                    <div class="fields" id="nav-login-field">
                        <div class="dots" id="nav-login-dot"></div>
                        <li><a href="/login" id="nav-login-button">Anmelden</a></li>
                    </div>
                </div>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Search Bar -->
        <div class="search-bar-field" id="category-fields">
            <div class="search-bar">
                <img src="/pictures/Luppe.png" alt="">
                <input type="search" placeholder="Suche">
            </div>
        </div>
        <!-- Search Result -->
        <div class="search-result-field"id="category-fields">

        </div>
        <!-- Footer -->
        <div class="info-box" id="category-fields">
            <ul>
                <li><a href="/impressum">Impressum</a></li>
                <li><a href="/ueber">Über uns</a></li>
                <li><a href="/legal">Rechtliches & Richtlinien</a></li>
                <li><a href="/cookies">Cookies</a></li>
            </ul>
            
            <p>&copy; 2025 Hoerfrei</p>
        </div>
    </main>

    <div class="audio-player">
        <div class="track-info">
            <p id="track-title">Kein Lied ausgewählt</p>
        </div>
        <audio id="audio" controls>
            Your browser does not support the audio element.
        </audio>
    </div>
</body>

</html>
