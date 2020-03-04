const record = document.querySelector('#record'),
shot = document.querySelector('#shot'),
hit = document.querySelector('#hit'),
dead = document.querySelector('#dead'),
enemy = document.querySelector('#enemy'),
again = document.querySelector('#again');


const play = {
    record: 0,
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
    hit(){

    },
    miss(target){
        this.changeClass(target, 'miss');
    },
    dead(){

    },
    changeClass(target, classValue){
        target.className = classValue;
    },
}

const fire = (event) => {
    const target = event.target;
    if(!event.target.classList.contains('miss')){
        play.updateData = 'shot';
    }
    show.miss(target);
  
    
    /*play.shot++;
    play.render();*/
}

const init = () => {
    enemy.addEventListener('click', fire);
}

init();

