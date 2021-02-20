const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
changeVolum = document.querySelector('.changeVolum'),
easy = document.querySelector('.easy'),
medium = document.querySelector('.medium'),
hard = document.querySelector('.hard'),
buttons = document.querySelector('.buttons');
car = document.createElement('div');
game = document.querySelector('.game');
car.classList.add('car');
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
console.log('easy');
console.log('medium');
console.log('hard');
Object.preventExtensions(keys);

const settings = {
    start: false,
    score: 0,
    speed: 0, 
    traffic: 0, // distance between cars
};



let getQuantityElements = (heihtElement) => {
   return document.documentElement.clientHeight / heihtElement + 1; 
}

let levelEasy = () => {
    settings.speed = 3;
    settings.traffic = 3;
    console.log('easy');
}


let levelMedium = () => {
    settings.speed = 6;
    settings.traffic = 2;
    settings.score = 2;
    console.log('medium');
}

let levelHard = () => {
    settings.speed = 6;
    settings.traffic = 1.5;
    settings.score = 3;
    console.log('hard');
}




let startGame = () => {
    if(settings.speed === 0 || settings.traffic ===0 ){
        return;
    }

    start.classList.add('hide');
    buttons.classList.add('hide');
    changeVolum.classList.remove('hide');
    gameArea.innerHTML = '';
    gameArea.innerHTML = '<audio id="myaudio" src="./music/8bitRace.mp3" autoplay loop ></audio>';
    document.querySelector('#myaudio').volume = 0.1;
    for (let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

 for(let i = 0; i < getQuantityElements(100 * settings.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        if((Math.random() * 10) < 8){
            enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat'; 
        }else enemy.style.background = 'transparent url(./image/enemyOnMoto.png) center / cover no-repeat';
        
        gameArea.appendChild(enemy);
    }
for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++){
    const city = document.createElement('div');
    city.classList.add('city');
    city.y = 0;
    
}
    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
};
let moveRoad = () =>{
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += settings.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}
/* animation of exploision*/
let exploision = () => {
    let start = Date.now();

    let timer = setInterval(() => {
      let timePassed = Date.now() - start;

      car.classList.add('exploision');

      if (timePassed > 2200){
        clearInterval(timer);
        car.classList.remove('exploision');
      } 

    }, 20);
  };
let moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) =>{
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
             carRect.right >= enemyRect.left &&
             carRect.left <= enemyRect.right &&
             carRect.bottom >= enemyRect.top){
                exploision();
                console.warn('ДТП');
                settings.start = false;
                start.classList.remove('hide');
                buttons.classList.remove('hide');
                score.style.top = 0;
        }
        
        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight){
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

  
}

const musicPlay = () =>{
    if (changeVolum.src.indexOf('unactive.png')!=-1) {
        changeVolum.src  = "./image/volume/active.png";
        document.querySelector('#myaudio').volume = 0.1;
    }
     else {
        changeVolum.src  = "./image/volume/unactive.png";
        document.querySelector('#myaudio').volume = 0;
   }

}

let playGame = () =>{
    if(settings.start){
        settings.score += settings.speed;
        score.textContent = 'SCORE: ' + settings.score;
        moveRoad();
        moveEnemy();
            if (keys.ArrowLeft && settings.x > 0) {
                settings.x -= settings.speed;
            }
            if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
                settings.x += settings.speed;
            }
            if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
                settings.y += settings.speed;
            }
            if (keys.ArrowUp && settings.y > 0) {
                settings.y -= settings.speed;
            }
            car.style.left = settings.x + 'px';
            car.style.top = settings.y + 'px';        
        requestAnimationFrame(playGame);
    }
};
//доработать
let pageY = 0;
let pageX = 0;
let mouseDown = 0;
let mouseControl = () =>{
    document.body.onmousedown = () =>{
        mouseDown++;
    }
    document.body.onmouseup = () =>{
        mouseDown--;
    }
    document.addEventListener('mousemove', (event) => {
        if(mouseDown === 0) {
            if (pageY) {
                if (event.pageX > pageX /*&& settings.x > 0*/) {
                    settings.x += settings.speed;
                    console.log('вправо');
                } else if (event.pageX < pageX  /*&& settings.x < (gameArea.offsetWidth - car.offsetWidth)*/) {
                    settings.x -= settings.speed;
                    console.log('влево');
                } else if (event.pageY < pageY /*&& settings.y < (gameArea.offsetHeight - car.offsetHeight)*/) {
                    settings.y -= settings.speed;
                    console.log('вверх');
                } else if (event.pageY > pageY ){
                   settings.y += settings.speed;
                   console.log('вниз');
                    
                }
            }
        }
        
        pageX = event.pageX;
        pageY = event.pageY;
    });        
}

//
let startRun = (event) =>{
    event.preventDefault();
    keys[event.key] = true;
};

let stopRun = (event) => {
    event.preventDefault();
    keys[event.key] = false;
};
easy.addEventListener('click',levelEasy);
medium.addEventListener('click',levelMedium);
hard.addEventListener('click',levelHard);
start.addEventListener('click', startGame);
changeVolum.addEventListener('click',musicPlay)
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
document.addEventListener('mousedown', mouseControl);
