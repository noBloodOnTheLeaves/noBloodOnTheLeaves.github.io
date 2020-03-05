const record = document.querySelector('#record'),
shot = document.querySelector('#shot'),
hit = document.querySelector('#hit'),
dead = document.querySelector('#dead'),
enemy = document.querySelector('#enemy'),
again = document.querySelector('#again'),
table = document.querySelector('#enemy'),
header = document.querySelector('.header');


const game = {
    ships: [
        {
            location: ['26','36','46','56',],
            hit: ['','','','']
        },
        {
            location: ['11','12','13'],
            hit: ['','','']
        },
        {
            location: ['69','79'],
            hit: ['','']
        },
        {
            location: ['32'],
            hit: ['']
        }],
        shipCount: 4,
};

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data){
        
        this[data]++;
        this.render();
    },
    render(){
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    },
};

const show = {
    hit(target){
        this.changeClass(target, 'hit');
    },
    miss(target){
        
        this.changeClass(target, 'miss');
    },
    dead(target){
        this.changeClass(target, 'dead');
    },
    changeClass(target, classValue){
        target.className = classValue;
    },
}

const fire = (event) => {
    const target = event.target;
    if(target.classList.length !==0 || target.tagName !== 'TD') return;
    if(game.shipCount < 1 && target.tagName === 'TD' )return;//зачем убирать клики?
    show.miss(target);
    play.updateData = 'shot';
    for (let index = 0; index < game.ships.length; index++) {
        const ship = game.ships[index];
        const id = ship.location.indexOf(target.id);
        if(id >= 0){
            show.hit(target);
            play.updateData = 'hit';
            ship.hit[id] = 'x';
            const life = ship.hit.indexOf('');
            if(life < 0){
                play.updateData = 'dead';
                for (const id of ship.location) {
                    show.dead(document.getElementById(id));
                }
                game.shipCount -= 1;
                if(game.shipCount < 1 ){
                    //header.innerHTML = `<h1 style="color:red">Game Over!</h1>`;
                    table.innerHTML = `<h1 style="color:red">Game Over!</h1>`;//если можно убрать всю таблицу xD
                    if(play.shot < play.record || play.record ===0){
                        localStorage.setItem('seaBattleRecord',play.shot);
                        play.record = play.shot;
                        play.render();
                    }
                 
                }
            }
        }
    }
  
    
    /*play.shot++;
    play.render();*/
}

const init = () => {
    enemy.addEventListener('click', fire);
    play.render();
    again.addEventListener('click',()=>{
        location.reload();
    });
}

init();

