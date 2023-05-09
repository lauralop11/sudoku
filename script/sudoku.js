// y = position columne
// x = position des elements dans l'array

var tableauSolution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8], 
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3], 
    [4,2,6,8,5,3,7,9,1], 
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4], 
    [2,8,7,4,1,9,6,3,5], 
    [3,4,5,2,8,6,1,7,9]
];
// Function principal
function selectionNiveau(choix){
    
    creeTableau();
    affichageDevoiles (choix);
    desactiveBouton();
}
function desactiveBouton(){
    document.getElementsByClassName('bouton')= disabled;
  
}

// Creation du tableau
function creeTableau() {
    const board = document.getElementById ('sudoku');
    const tableJeu = document.createElement('table');
    const tblBody = document.createElement('tbody');
    
    for (let y = 0; y <= 8; y++) 
    {
        // Creation des lignes
        const ligne = document.createElement('tr');
        ligne.classList = 'bloque';

        for (let x = 0; x <= 8; x++) 
        {
            // Creation des columnes
            const createTd = document.createElement('td');
            var inputTd = document.createElement('input');
            inputTd.setAttribute('type', 'text');
            inputTd.classList = 'case';

            // Attribute de position
            inputTd.setAttribute('pos-hor', x);
            inputTd.setAttribute('pos-ver', y);
            

            // Creation des lignes pour separer chaque case
            if (x == 3 || x == 6) {
                createTd.classList.add('ligneVer');
            }  
            if (y == 3 || y == 6) {
                createTd.classList.add('ligneHor');
            }

            createTd.appendChild(inputTd);
            ligne.appendChild(createTd);
           
            inputTd.addEventListener('input', validationLigne.bind(null, x, y, inputTd));
            inputTd.addEventListener('input', validationColumne.bind(null, x, y, inputTd));
            inputTd.addEventListener('input', validation3x3.bind(null, x, y, inputTd));
        }
        
        tblBody.appendChild(ligne);
    }
    tableJeu.appendChild(tblBody);
    board.appendChild(tableJeu);
    
    // Creation bouton pour recommencer un jeu
    const createButton = document.createElement('button');
    createButton.setAttribute ('type', 'button');
    createButton.innerText = 'Nouveau Jeu';
    board.appendChild(createButton);
    createButton.addEventListener('click', nouveauJeu.bind());
    
  }

  // Affichage des devolies pour les niveaux difficil, medium et facile.
function affichageDevoiles (choix){
    let valueX;
    let valueY;
    
    if (choix == 'difficile'){
        var finAffichage = 15;
    }
    if (choix == 'medium'){
        var finAffichage = 20;
    }
    if (choix == 'facile'){
        var finAffichage = 30;
    }
    for (let i = 0; i <= finAffichage; i++){
        
        valueX = Math.floor(Math.random ()* 10);
        valueY = Math.floor(Math.random ()* 10);

        if (valueX > 0){
            valueX--;
        }
        if (valueY > 0){
            valueY--;
        }
        document.querySelector('[pos-ver="' + valueX + '"][pos-hor="' + valueY + '"]').value = tableauSolution[valueX][valueY];
        document.querySelector('[pos-ver="' + valueX + '"][pos-hor="' + valueY + '"]').setAttribute('style', "color:blue;");

         }
         
    }

 // Function validation ligne
function validationLigne (x, y ,inputCase) {
    let valueInput = inputCase.value;
    // Validation de chiffre [1-9]
    if ((valueInput > 0) && (valueInput <=9)){
        inputCase.style.color ='black';
    }else {
     inputCase.style.color ='red';   
    }
    
    for (let i = 0; i < tableauSolution[y].length; i++){
        if (x != i){
            if (valueInput == document.querySelector('[pos-ver="' + y + '"][pos-hor="' + i + '"]').value){
            inputCase.style.color ='red';
            return;
            }
        }   
    }
}

 // Function validation columne
 function validationColumne (x, y ,inputCase) {
    let valueInput = inputCase.value;
    
    for (let i = 0; i < tableauSolution[x].length; i++){
        if (y != i){
            if (valueInput == document.querySelector('[pos-ver="' + i + '"][pos-hor="' + x + '"]').value){
            inputCase.style.color ='red';
            return;
            }
        }   
    }
}

// Function validaction boit 3x3
function validation3x3(x, y, inputCase){
    const valueInput = inputCase.value;
    const debutI = y - (y % 3);
    const debutJ = x - (x % 3);
    
    for (let i = debutI; i < debutI + 3; i++) {
        for (let j = debutJ; j < debutJ + 3; j++) {
            if (i !== y && j !== x) {
                if (valueInput == document.querySelector('[pos-ver="' + i + '"][pos-hor="' + j + '"]').value){
                    inputCase.style.color ='red';
                    return;
                }
            }
        }
    }
}
// Function table plain

// Function pour cree un nouveau jeu.
function nouveauJeu (){
    location.reload();
    document.getElementById('tic-tac-toe').innerHTML = '';
    
}
   