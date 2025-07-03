<%@ page contentType="text/html; charset=UTF-8" language="java" %> <!-- FOR THE GERMAN LANGUAGE -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- To display the Songs    -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- Import: JSTL Functions library -->

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/pictures/logo.ico" type="image/x-icon">

    <title>Hoerfrei/home</title>
    <!-- CSS -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/css/home.css">
    <link rel="stylesheet" href="/css/universal.css">
    <!-- JS -->
    <script src="/js/home.js" defer></script>

</head>

<body>
    <header class="header">
        <div class="left">
            <div class="logo">
                <a href="/home">
                    <img src="/pictures/logo-q.png" class="header-logo">
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
                    <div class="fields" id="nav-support-field">
                        <div class="dots" id="nav-support-dot"></div>
                        <li><a href="/support" id="nav-discover-button">Unterstützen</a></li>
                    </div>
                    <div class="fields" id="nav-contact-field">
                        <div class="dots" id="nav-contact-dot"></div>
                        <li><a href="/contact" id="nav-discover-button">Kontakt</a></li>
                    </div>
                    <div id="nav-profile-field">
                        <a href="/home"><i class="fa-solid fa-user"></i></a>
                    </div>
                    <!-- MAKE A PROGILE ICON, WITH WICH THE SITE HAS TO CHECK, IF USER LOGGED, OR NOT
                    -> FOREWARDING THE USER TO THE CORRESPONGING PAGE -->
                </div>
            </ul>
        </nav>
    </header>

    <main>
        <div class="category-fields" id="cf-top"> <!-- Popular -->
            <div class="category-fields-background"></div>
            <div class="category-title">
                <h1>🔥Heiße Lieder</h1>
            </div>
            <button class="carousel-btn prev"><span>➤</span></button>
                <div class="carousel-wrapper" id="cw-h">
                    <div class="songs-list">
                        <c:forEach var="song" items="${popularSongs}">
                            <div class="song-item" id="si-h" onclick="play(
                                    '/audio/${song.audioUrl}',
                                    '${song.jsSafeTitle}',
                                    '${song.imageUrl}',
                                    '${song.jsSafeAuthor}')">
                                <img src="/pictures/${song.imageUrl}" alt="${song.title}">
                                <p>${song.title}</p>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            <button class="carousel-btn next"><span>➤</span></button>
        </div>
        <div class="category-fields"> <!-- Random -->
            <div class="category-fields-background"></div>
            <div class="category-title">
                <h1>🔁Zufällige Lieder</h1>
            </div>
            <button class="carousel-btn prev"><span>➤</span></button>
                <div class="carousel-wrapper" id="cw-r">
                    <div class="songs-list">
                        <c:forEach var="song" items="${randomSongs}">
                            <div class="song-item" id="si-r" onclick="play(
                                    '/audio/${song.audioUrl}',
                                    '${song.jsSafeTitle}',
                                    '${song.imageUrl}',
                                    '${song.jsSafeAuthor}')">
                                <img src="/pictures/${song.imageUrl}" alt="${song.title}">
                                <p>${song.title}</p>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            <button class="carousel-btn next"><span>➤</span></button>
        </div>
        <div class="category-fields"> <!-- New -->
            <div class="category-fields-background"></div>
            <div class="category-title">
                <h1>💫Neue Lieder</h1>
            </div>
            <button class="carousel-btn prev"><span>➤</span></button>
                <div class="carousel-wrapper" id="cw-n">
                    <div class="songs-list">
                        <c:forEach var="song" items="${newSongs}">
                            <div class="song-item" id="si-n" onclick="play(
                                    '/audio/${song.audioUrl}',
                                    '${song.jsSafeTitle}',
                                    '${song.imageUrl}',
                                    '${song.jsSafeAuthor}')">
                                <img src="/pictures/${song.imageUrl}" alt="${song.title}">
                                <p>${song.title}</p>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            <button class="carousel-btn next"><span>➤</span></button>
        </div>
        <!-- Footer -->
        <div class="info-box" >
            <div class="ib-top">
                <div class="ib-t-left-column">
                    <ul>
                        <li><a href="/impressum">Impressum</a></li>
                        <li><a href="/ueber">Über uns</a></li>
                        <li><a href="/legal">Rechtliches & Richtlinien</a></li>
                        <li><a href="/cookies">Cookies</a></li>
                    </ul>
                </div>
                <div class="ib-t-right-row"> <!-- Social Media Icons (Make them glow when hovering) -->
                    <ul>
                        <li><a href="/home" id="ib-i-LI"><i class="fa-brands fa-linkedin"></i></a></li>
                        <li><a href="/home" id="ib-i-TT"><i class="fa-brands fa-tiktok"></i>
                        <li><a href="/home" id="ib-i-IG"><i class="fa-brands fa-instagram"></i>
                        <li><a href="/home" id="ib-i-YT"><i class="fa-brands fa-square-youtube"></i>
                        <li><a href="/home" id="ib-i-X"><i class="fa-brands fa-x-twitter"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="bottom-box-seperator"></div> <!-- SEPERATOR -->
            <div class="ib-bot">
                <p>&copy; 2025 Hoerfrei</p>
                <p>Hansastraße 1, 90441 Nürnberg</p>
                <!-- Language chooser -->
            </div>
        </div>
        <div class="AD-Banner"></div>
    </main>

    <div class="footer-bump"></div>

    <div class="audio-player">
        <div class="ap-left" id="ap-section">
            <div class="ap-l-image">
                <img src="" id="ap-l-image">
            </div>
            <div class="ap-l-info-field">
                <div class="ap-l-i-title-field">
                    <span class="ap-title-text" id="ap-l-i-title"></span>
                </div>
                <div class="ap-l-i-author-field">
                    <span class="ap-author-text" id="ap-l-i-author"></span>
                </div>
            </div>
        </div>


        <div class="ap-center">
            <div class="ap-progress">
            <div class="ap-progress-bar">
                <div class="ap-progress-fill"></div>
            </div>
            <div id="progress-tooltip" style="position:absolute; display:none; background:#000; color:#fff; padding:4px 8px; border-radius:5px; font-size:0.8rem; pointer-events:none; transform: translateX(-50%); white-space: nowrap; z-index:1000;"></div>
            </div>

            <div class="ap-controls">
                <div class="btn-tooltip" data-tooltip="-5">
                    <button id="skipb-btn">↻</button>
                </div>
                <button id="play-btn">▶</button>
                <div class="btn-tooltip" data-tooltip="+5">
                    <button id="skipf-btn">↺</button>
                </div>
            </div>

            <audio id="audio" src=""></audio>
        </div>

        
        <div class="ap-right" id="ap-section">
            <div class="volume-control hidden">
                <i class="fa-solid fa-volume-high" id="volume-icon"></i></i>
                <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="0.5">
            </div>
        </div>

    </div>
</body>

</html>
