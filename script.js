var player1 = "X";
var player2 = "O";
var currentPlayer = "";
var DOMjoueur1 = document.getElementById("joueur1");
var DOMjoueur2 = document.getElementById("joueur2");
var content = document.getElementById('main');
var tourElt = document.getElementById('tour');
var message = document.createElement('h2');
var tour = 1;
var victoire = false;

var nbLignesAsk = prompt("combien de lignes voulez-vous ?");
var nbLignes = parseInt(nbLignesAsk);

var askPlayer = window.prompt("Quel joueur commence la partie ? Répondez 1 ou 2");
question();
changerJoueur(currentPlayer);

function question() {
    if (askPlayer == "1") {
        currentPlayer = player1;
    } else if (askPlayer == "2") {
        currentPlayer = player2;
    } else {
        question();
    }
}


// créer tableau multidimensionnel
var grille = new Array(nbLignes);
for (i = 0; i < grille.length; i++) {
    grille[i] = new Array(nbLignes);
}

// créer les lignes et les cases
for (i = 0; i < nbLignes; i++) {
    var ligne = document.createElement('div');
    ligne.style.textAlign = "center";

    for (j = 0; j < nbLignes; j++) { // crée les 3 colonnes
        var caseX = document.createElement('input');
        caseX.type = "button";
        caseX.style.display = "inline-block";
        caseX.style.width = "80px";
        caseX.style.height = "80px";
        caseX.style.margin = "3px";
        caseX.style.fontFamily = 'metroregular';
        caseX.style.backgroundColor = '#f9fcd6';
        caseX.className = i + "_" + j;
        caseX.onclick = function () {
            jouer(this);
        }
        ligne.appendChild(caseX);

    }
    content.appendChild(ligne);
}

function jouer(arg) { // gère le tableau multi
    // récupérer la classe de la case jouée
    var classeJouee = arg.className;

    if (!arg.value) { // si la case est vide
        arg.value = currentPlayer;
        var tab = classeJouee.split("_");
        var x = parseInt(tab[0]);
        var y = parseInt(tab[1]);
        grille[x][y] = currentPlayer;
    }
    arg.style.fontSize = "2em";
    arg.style.fontWeight = "bold";
    verif(x, y);
    changerJoueur(currentPlayer);

    compterTour();
}

function verif(x, y) { // x = ligne ; y = colonne
    // vérifier les colonnes
    if (verifColonne(y) === nbLignes) {
        victoire = true;
    }
    // vérifier les lignes
    if (verifLigne(x) === nbLignes) {
        victoire = true;
    }
    // vérifier les diagonales 
    if (verifDiagDr() === nbLignes) {
        victoire = true;
    }
    if (verifDiagGa() === nbLignes) {
        victoire = true;
    }
    if (victoire) { // il y a un gagnant 
        gagnant();
    }
    if ((victoire == false) && (tour === Math.pow(nbLignes, 2))) {
        matchNul();
    }
}

function verifColonne(y) {
    var count = 0;
    for (x = 0; x < nbLignes; x++) {
        if (grille[x][y] == currentPlayer) {
            count++;
        } else break;
    }
    return count;
}

function verifLigne(x) {
    var count = 0;
    for (y = 0; y < nbLignes; y++) {
        if (grille[x][y] == currentPlayer) {
            count++
        } else break;
    }
    return count;
}

function verifDiagDr() {
    var X = 0;
    var Y = 0;
    var count = 0;
    while (X < nbLignes) {
        if (grille[X][Y] == currentPlayer) {
            count++;
        } else break;
        X++;
        Y++;
    }
    return count;
}

function verifDiagGa() {
    var X = 0;
    var Y = nbLignes - 1;
    var count = 0;
    while (X < nbLignes) {
        if (grille[X][Y] == currentPlayer) {
            count++;
        } else break;
        X++;
        Y--;
    }
    return count;
}

function gagnant() {
    var quelJoueur = "";
    if (currentPlayer === "X") {
        quelJoueur = " joueur 1 ";
    } else {
        quelJoueur = " joueur 2 ";

    }
    message.textContent = "Le" + quelJoueur + "gagne la partie !";
    content.appendChild(message);
    // bloque les cases s'il y a un gagnant
    var cases = document.getElementsByTagName('input');
    for (j = 0; j < Math.pow(nbLignes, 2); j++) {
        cases[j].onclick = null;
    }
}

function changerJoueur(joueur) {
    if (joueur == "O") {
        currentPlayer = player1;
        DOMjoueur1.style.backgroundColor = " #ffe909";
        DOMjoueur1.style.color = "black";
        DOMjoueur1.style.fontWeight = "bold";
        DOMjoueur2.style.backgroundColor = "#f9fcd6";
        DOMjoueur2.style.color = "black";
        DOMjoueur2.style.fontWeight = "normal";

    } else if (joueur == "X") {
        currentPlayer = player2;
        DOMjoueur2.style.backgroundColor = " #ffe909";
        DOMjoueur2.style.color = "black";
        DOMjoueur2.style.fontWeight = "bold";
        DOMjoueur1.style.backgroundColor = "#f9fcd6";
        DOMjoueur1.style.color = "black";
        DOMjoueur1.style.fontWeight = "normal";
    }
}

function compterTour() {
    if (tour < Math.pow(nbLignes, 2)) {
        tour++;
        tourElt.textContent = tour;
    }
}

function matchNul() {
    message.textContent = "Il y a match nul !";
    content.appendChild(message);
}