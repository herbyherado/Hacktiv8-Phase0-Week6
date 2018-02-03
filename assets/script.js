//-----------------------------CREATE DIV ID IN #GAMEBOARD------------------------//
var rows = 5;
var cols = 5;
var squareSize = 100;
var coordinates = ['A', 'B', 'C', 'D', 'E'];

// get the container element
var gameBoardContainer = document.getElementById('gameboard');
// var gameAttrId = document.createAttribute('id')

for (i = 0; i < cols; i++){
    for(j = 0; j < rows; j++){

        // create a new div HTML element for each grid square and make it the right size
        var square = document.createElement("div");
        gameBoardContainer.appendChild(square);
        
        // give each div element a unique id based on its row and column, like "s00"
        square.id = 's' + j + i;	

        // set each grid square's coordinates: multiples of the current row or column number
        var topPosition = j * squareSize;
        var leftPosition = i * squareSize;			

        // use CSS absolute positioning to place each grid square on the page
        square.style.top = topPosition + 'px';
        square.style.left = leftPosition + 'px';
        square.title = `${coordinates[j]} ${i}`

    }
}
//-------------------------SET RANDOM HIDDEN BATTLESHIP----------------------------//
function randomRow(){
    return Math.abs(Math.round(Math.random()*4));
}

function randomCol(){
    return (Math.round(Math.random()*4));
}
// places random battleship 
let shipRow = randomRow();
let shipCol = randomCol();
let hiddenShip = String(shipRow) + String(shipCol);

// console.log(shipRow)
// console.log(shipCol)
// console.log(hiddenShip)
    
//-------------------------IF PRESSED ENTER IN INPUT TEXT---------------------------//

function hitEnter(e){
    if (e.keyCode === 13){
        e.preventDefault();
        fire();
    }
}
//----------------------FUNCTION FOR TEXT PROCESSING IN FORM------------------------//
var turn = 5;

function fire(){
    // changes amount of turns in heading
    if (turn === 0){
        return alert('Reload page to play again.')
    }
    turn--;
    document.getElementById('t').innerHTML = turn;
    // console.log(document.getElementById('t'))
    
    // gets the value and changes it to uppercase
    // alert(document.getElementById('guess-input').value)
    var guess = document.getElementById('guess-input').value.toUpperCase();
    // console.log(guess)

    // if input is greater than 2 characters, then return 
    if(guess.length > 2){
        document.getElementById("message").innerHTML = 'Invalid input. Try again.'
        return alert('Invalid input. Try again.')
    }

    // below are the coordinates to be targeted for the box
    positionX = coordinates.indexOf(guess[0]);
    positionY = guess[1];

    // check if input between A-E is correct
    if (positionX == -1){
        document.getElementById("message").innerHTML = "That's not even the space! haha!"
        return alert("Please input your row coordinates between A-E")
    }
    // check if input between 0-4 is correct
    if (positionY < 0 || positionY > 4 || !positionY){
        document.getElementById("message").innerHTML = "That's not even the space! haha!"
        return alert("Please input your column coordinates between 0-4")
    }
    // console.log(positionX);
    // console.log(positionY);
    var target = String(positionX) + String(positionY);
    var idTarget = 's' + positionX + positionY;
    
    // guess.value === null;
    checkShip(target, idTarget, guess);
    // return null;
}

function checkShip(target, idTarget, guess){
    if (target == hiddenShip){
        document.getElementById(idTarget).style.backgroundColor = 'rgba(252,13,27,0.8)';
        document.getElementById("message").innerHTML = "Congratulations! You destroyed my Battleship!"
        turn = 0;
        document.getElementById('t').innerHTML = turn;
        return alert('Congratulations! You destroyed my Battleship!')
    } else {
        // console.log('==========')
        if (turn == 0){
            document.getElementById("message").innerHTML = `Your coordinate input ------- ${guess[0]} ${guess[1]} You Lose! Our hidden Battleship is at ${coordinates[(hiddenShip[0])]} ${hiddenShip[1]} indicated at red`
            // console.log('s'+hiddenShip)
            document.getElementById('s'+hiddenShip).style.backgroundColor = 'rgba(252,13,27,0.8)';
            document.getElementById(idTarget).style.backgroundColor = 'rgba(255, 212, 55, 0.65)';
            return alert('You Lose!');
        }
        
        // changes color of the border
        document.getElementById("message").innerHTML = `Your coordinate input ------- ${guess[0]} ${guess[1]}  You missed my Battleship! Try again!`
        document.getElementById(idTarget).style.backgroundColor = 'rgba(255, 212, 55, 0.65)';
    }
}