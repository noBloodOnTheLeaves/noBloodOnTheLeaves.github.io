document.addEventListener('DOMContentLoaded', function () {
    const testForm = document.querySelector('.col-xl-8'),
    answerbutton = document.querySelector('.answerbutton '),
    getQuestionBlock = document.getElementsByClassName('example-shadow-3'),
    inputBlock = document.querySelector('.content');
    

 /*Парсинг*/

 let requestURL = './questions.json';
 let request = new XMLHttpRequest();
 request.open('GET', requestURL);
 request.responseType = 'json';
 request.send();
 request.onload = () => {
     let answerJson = request.response;
     //console.log(randomQuestions(answerJson));*/
     renderQuerstionBlock(randomQuestions(answerJson));
 };
 

 /*30 вопросов*/
 const randomQuestions = (answerJson) =>{
     answerJson.sort(() => 0.5 - Math.random());
    return answerJson.slice(0, 30);
 };

    /*Создаение блока вопрос/ответ*/
    const creatQuestion = (id,question,answer1,answer2,answer3,answer4,answer5,answer6,trueAnswer) =>{
        const questionBlock = document.createElement('div');
        let answ5, answ6;
        if(answer5){
            answ5 =  `<label class='radiocontainer'>${answer5}<input type='radio' value="5"   /><span
            class='checkmark'></span></label>`;
        }else answ5 = ``;
        if(answer6){
            answ6 =  `<label class='radiocontainer'>${answer6}<input type='radio'  value="6"  /><span
            class='checkmark'></span></label>`;
        }else answ6 = ``;

        questionBlock.innerHTML = `<div  class="example-shadow-3">
<div class="question">
  <p>${question}</p>
</div>
<div id="${id}">
<label class='radiocontainer'>${answer1}<input type='radio' value="1"/><span
    class='checkmark'></span></label>
<label class='radiocontainer'>${answer2}<input type='radio' value="2"
    /><span class='checkmark'></span></label>
<label class='radiocontainer' >${answer3}<input type='radio' value="3"
    /><span class='checkmark'></span></label>
    <label class='radiocontainer' >${answer4}<input type='radio'  value="4"
    /><span class='checkmark'></span></label>
    ${answ5}
    ${answ6}
    </div>
</div>`;
answ5 = '';
answ6 = '';
localStorage.setItem(`${id}`,`${trueAnswer}`);


return questionBlock;
    
};


/*Рендер блока вопрос/ответ*/
const renderQuerstionBlock = (questions) => {
    inputBlock.innerHTML = '';
    if(questions.length){
        questions.forEach(({id,question,answer1,answer2,answer3,answer4,answer5,answer6,trueAnswer}) => {
            inputBlock.append(creatQuestion(id,question,answer1,answer2,answer3,answer4,answer5,answer6,trueAnswer));
        }); 
    }else {
        inputBlock.innerHTML = `<h1>Вопросов нет</h1>` ;
    }
};

    /* Пока ставит галки при выборе ответе*/ 
    const checkBtn = (event) => {
        const target = event.target;
            
        if (target.classList.contains('radiocontainer')) {
            if(target.querySelector('.radiocontainer>span').textContent === '' ){
                target.querySelector('.radiocontainer>span').textContent = '✓';
                target.querySelector('.checkmark').classList.toggle('active');
            }else if(target.querySelector('.radiocontainer>span').textContent === '✓'){
                target.querySelector('.radiocontainer>span').textContent = '';
                target.querySelector('.checkmark').classList.toggle('active'); 
            }
        }
    };
    //Вывод результатов
    const result = (count,mistakeAnsw) => {
        inputBlock.innerHTML = '';
        document.getElementById('answerbuttoncontainer').innerHTML = '';
        const resultBlock = document.createElement('div');
        resultBlock.innerHTML = `
<div class="question">
  <p>Результат:</p>
</div>
 <h4>Всего правильных ответов ${count} из 30</h4>
</br>
<h5>Ошибки в вопросах:</h5>`;
for (let index = 0; index < mistakeAnsw.length; index++) {
    const element = mistakeAnsw[index];
    resultBlock.innerHTML += element;
}
resultBlock.setAttribute('class','example-shadow-3');
return resultBlock; 
    };
    //Проверка вопросов

    const checkAnswer = () => {
        let mistakeAnsw = [];
        let count = 0;
        for (let index = 0; index < getQuestionBlock.length; index++) {
            let element = getQuestionBlock[index];
            let qBlock = element.children[1];
            //console.log(element.children[0]);
            //console.log(localStorage.getItem(`${qBlock.id}`));//правильные ответы
            
            
            let radiocontainer = '';
            for (let i = 1; i < qBlock.childNodes.length; i = i + 2) {
                let child = element.children[1].childNodes[i];
               // console.log(child);
                if(child.querySelector('.radiocontainer>span').textContent === '✓'){
                    radiocontainer += child.querySelector('.radiocontainer>input').value;
                   // console.log(child.querySelector('.radiocontainer>input').value); //значение там где галка
                }
                
                
            }
            
            if(radiocontainer === localStorage.getItem(`${qBlock.id}`)){
                console.log(`ответ пользователя ${radiocontainer} - и правильный ответ снизу`);
                console.log(localStorage.getItem(`${qBlock.id}`));
                count++;
            }else {
                mistakeAnsw[index] = '<p><br/>'+ element.children[0].textContent + '<p/>';
                //console.log(element.children[0].textContent); 
            }
            radiocontainer = '';
            
           
            
            
            
        }
        inputBlock.append(result(count,mistakeAnsw));
        console.log(`Всего правильных ответов ${count} из 30`);
        
    };

    testForm.addEventListener('click', checkBtn);
    answerbutton.addEventListener('click',checkAnswer);
});