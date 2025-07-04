<%@ page contentType="text/html; charset=UTF-8" language="java" %> <!-- FOR THE GERMAN LANGUAGE -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- To display the Songs    -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- Import: JSTL Functions library -->

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/pictures/logo.ico" type="image/x-icon">

    <title>Hoerfrei/discover</title>
    <!-- CSS -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="/css/underconstruct.css">
    <link rel="stylesheet" href="/css/universal.css">

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
                        <li><a href="/support" id="nav-support-button">Unterstützen</a></li>
                    </div>
                    <div class="fields" id="nav-contact-field">
                        <div class="dots" id="nav-contact-dot"></div>
                        <li><a href="/underconstruct" id="nav-contact-button">Kontakt</a></li>
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

    <div class="header-bump"></div>

    <main>
        <div class="center">
            <div class="sign-field" id="header-bump-construct-fix">
                <div class="sign">
                    <div class="s-title">
                        <h1>Diese Seite befindet sich im Bau</h1>
                    </div>
                    <div class="s-goback">
                        <a href="/home">
                            Zurück nach Hause
                        </a>
                    </div>
                </div>
            </div>
        </div>
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
