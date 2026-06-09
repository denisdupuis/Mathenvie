const Gauche = document.getElementById("Gauche");
const Droite = document.getElementById("Droite");

var TabEleves = "Eleves.json";

function Init() {
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
        Element.style.width = '100px';
        Element.style.borderRadius = '10px';
        Element.style.cursor = 'pointer';
        Element.style.alignItems = 'center';
        Element.textContent = `${E.NOM}`;
        Gauche.appendChild(Element);
        })
    })
}

Init();