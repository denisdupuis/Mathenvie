const Gauche = document.getElementById("Gauche");
const Droite = document.getElementById("Droite");
const Grille = document.getElementById("Grille");
const NomEleve = document.getElementById("NomEleve");
var NB = 0;

var TabEleves = "Eleves.json";
var TabProblemes = JSON.parse(localStorage.getItem("Mathenvie")) || [];;

function SaveTableau() {
    var TableauSauvegarde = JSON.stringify(TabProblemes);
    localStorage.setItem("Mathenvie", TableauSauvegarde);
}


function AfficherGrille(NB) {
    NomEleve.textContent = document.getElementById(NB).textContent;
    NomEleve.style.fontWeight = "bold";
    NomEleve.style.fontSize = "3rem";
    Grille.replaceChildren();    

    for (var i=1; i<61; i++) {            // Création de la grille
            var Probleme = document.createElement('div');
            Probleme.id = "P"+i;
            Probleme.style.fontSize = "2rem";
            Probleme.style.width = "50px";
            Probleme.style.height = "50px";
            Probleme.style.border = "solid";
            Probleme.style.display = "flex";
            Probleme.style.justifyContent = "center";
            Probleme.style.alignItems = "center";
            Probleme.style.cursor = "pointer";
            Probleme.textContent = i;
            if (TabProblemes[NB][i] == 1) {
                Probleme.style.backgroundColor = "green";
            } else Probleme.style.backgroundColor = "white";

            Probleme.addEventListener("mousedown", function(evt) {
                var ID = evt.target.id;
                ID = ID.replace("P","");
                if (evt.target.style.backgroundColor != "green") {
                  evt.target.style.backgroundColor = "green";
                  TabProblemes[NB][ID] = 1;
                  } else {
                    evt.target.style.backgroundColor = "white";
                    TabProblemes[NB][ID] = 0;
                  }
                SaveTableau();
            })
            Grille.appendChild(Probleme);
        }
}


function Init() {
    var NB = 0;
    console.log(TabProblemes);
    fetch(TabEleves)
    .then(reponse => {
        if (reponse.ok) {
            return reponse.json();
        }
        throw new Error(`${reponse.statusText} (${reponse.status})`)
    })

    .then(Donnee => {
        Donnee.forEach(E => {
        const Element = document.createElement('div');
        Element.id = NB;
        Element.style.width = '150px';
        Element.style.borderRadius = '10px';
        Element.style.cursor = 'pointer';
        Element.style.alignItems = 'center';
        Element.textContent = `${E.NOM}`;
        Element.addEventListener("mouseenter", function(evt) {
            
            evt.target.style.fontWeight = "bold";
            evt.target.style.color = "red";
        });
        Element.addEventListener("mouseleave", function(evt) {
            evt.target.style.fontWeight = "normal";
            evt.target.style.color = "black";
        });
        Element.addEventListener("mousedown", function(evt) {
            AfficherGrille(evt.target.id);
        });
        Gauche.appendChild(Element);
        NB = NB+1;
        })
        
        if (TabProblemes == []) {
          for (var i=0; i<NB; i++) {             // Au départ, aucun problème n'est résolu
              TabProblemes[i] = [];
              for (var j=0; j<60; j++) {
                  TabProblemes[i][j] = 0
              }
          }
        }  
    })
}

Init();