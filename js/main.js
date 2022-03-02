const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/bg.png';

const foodBurger = new Image();
foodBurger.src = 'img/burger.png';

const foodPizza = new Image();
foodPizza.src = 'img/pizza.png';

const foodFri = new Image();
foodFri.src = 'img/fri.png';

let box = 32; // width box field

let score = 0;

let scoreWin = 15;

let message = ['Вы проиграли!','Вы выиграли'];

let burgerPozFood = {
    x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let pizzaPozFood = {
    x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let friPozFood = {
    x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: box * 9,
    y: box * 10,
}

let difficult = Number(prompt('Пожалуйста выберите скорость от 1 до 10', '5')); // difficult game

if (difficult < 1 || difficult > 10) {
    difficult = 5;
};

document.addEventListener('keydown', direction);

let dir;

function direction(event){
    if(event.keyCode == 37 && dir != 'rihgt')
        dir = 'left';
    else if(event.keyCode == 38  && dir != 'down')
        dir = 'up';
    else if(event.keyCode == 39  && dir != 'left')
        dir = 'right';
    else if(event.keyCode == 40  && dir != 'up')
        dir = 'down';    
    
}

function eatTail(head, arr) {
    for(let i =0; i < arr.length; ++i){
        if(head.x == arr[i].x && head.y == arr[i].y){
            ctx.fillStyle = 'white';
            ctx.fillText(message[0], box * 7, box * 1.7);
            clearInterval(game);

        }
    }
}

function drawGround(){
 
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodBurger, burgerPozFood.x, burgerPozFood.y);
    ctx.drawImage(foodPizza, pizzaPozFood.x, pizzaPozFood.y);
    ctx.drawImage(foodFri, friPozFood.x, friPozFood.y);


    for(let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i == 0 ? 'yellow' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        if(i == scoreWin) {
            ctx.fillStyle = 'white';
            ctx.fillText(message[1], box * 7, box * 1.7);
            clearInterval(game);
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(`${score}/${scoreWin}`, box * 2.5, box * 1.7); // 15 - score win game

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == burgerPozFood.x && snakeY == burgerPozFood.y){
        score++;
        burgerPozFood = {
            x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
            y: Math.floor((Math.random() * 15 + 3)) * box, // 15 number box vertical
        };
    } else if(snakeX == pizzaPozFood.x && snakeY == pizzaPozFood.y){
        score++;
        pizzaPozFood = {
            x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
            y: Math.floor((Math.random() * 15 + 3)) * box, // 15 number box vertical
        };
    } else if(snakeX == friPozFood.x && snakeY == friPozFood.y){
        score++;
        friPozFood = {
            x: Math.floor((Math.random() * 17 + 1)) * box, // 17 number box horizont
            y: Math.floor((Math.random() * 15 + 3)) * box, // 15 number box vertical
        };
    } else  snake.pop();

    if(snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17){
        ctx.fillText(message[0], box * 7, box * 1.7);
        clearInterval(game);

    };

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);
}

let game = setInterval(drawGround, 60 * difficult);
