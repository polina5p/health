const questions = [
	{
		question: "Сколько шагов в день вы набираете ?",
		answers: ["меньше 5 000", "меньше 10 000", "вообще не хожу", "больше 10 000"],
		correct: 4,
	},
	{
		question: "Как только вы просыпаетесь , первым делом вы пьете",
		answers: [
			"кофе",
			"воду",
			"ничего не пью",
			"чай",
		],
		correct: 2,
	},
	{
		question: " В какое время вы засыпаете и просыпаетесь?",
		answers: [
			"отбой в 10-11; пробуждение в 7-9",
			"отбой в 7-9 часов ; пробуждение в 5-6",
			"отбой в 12 и более; пробуждение в 9 и более",
			"Всегда по-разному",
		],
		correct: 1,
	},
	{
		question: "Когда последний раз за день вы пользуетесь гаджетами ?",
		answers: ["перед сном", "за 3-4 часа до сна", "за 1-2 часа до сна", "не знаю"],
		correct: 2,
	},
	{
		question :"Ваш последний прием пищи ?",
		answers: ["когда-как","не ем после 18.00","за 3-4 часа до сна","перед сном пью чай с печеньками"],
		correct: 3,
	},
	{
		question : "Как часто вы пользуетесь SPF ( солнцезащитный крем)?",
		answers :["вообще не пользуюсь","пользуюсь только летом","пользуюсь круглый год","пользуюсь только в отпуске на юге"],
		correct : 3,
	},
	{
		question:" Как часто вы пьете кофе?",
		answers:["только утром"," утром и вечером","больше двух раз","не считал"],
		correct:1,
	},
	{
		question:" Вы всегда встаете по будильнику?",
		answers:["да","встаю чаще всего без будильника","когда как","встаю без будильника в одно и то же время "],
		correct: 4,
	},
	{
		question:"После пробуждения вы:",
		answers:["встаете сразу","немного дремлете и потом встаете","час лежите и только потом встаете","сплю дальше"],
		correct: 1,
	},
	{
		question:"Как часто вы вспоминаете о работе / учебе после ее окончания ?",
		answers:["всегда думаю о ней","думаю о ней когда - это требует обязанность","стараюсь не думать вообще","часто"],
		correct: 3,
	},
	{
		question:"Вы часто наблюдаете у себя следующие симптомы : зажатая челюсть, сжатые кулаки,  приподнятые плечи",
		answers:["почти всегда","иногда","только когда ситуация это требует","никогда"],
		correct: 3,
	},
	{
		question:"Как часто вы занимаетесь спортом ?",
		answers:["всегда","часто","иногда","никогда"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header'); // находим элементы
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
//Переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0;// текущий вопрос



clearPage();
showQuestion();
submitBtn.onclick = checAnswer;

function clearPage(){ // функция очистки страницы
	headerContainer.innerHTML = '';// очистка
	listContainer.innerHTML = '';
}

function showQuestion(){// отображение вопроса
	console.log('showQuestion');

	// Вопрос
	console.log(questions[questionIndex]['question']);

	const headerTemplate = '<h2 class="title">%title%</h2>';
	const title = headerTemplate.replace('%title%',questions[questionIndex]['question'] );

	headerContainer.innerHTML = title;




 // варианты ответов 
 let answerNumber = 1;
	for ( answerText of questions[questionIndex]['answers']){
		
		const questionTemplate = 
		`<li>
		  <label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		  </label>
	</li>`;
	
	const answerHTML = questionTemplate
	                         .replace('%answer%', answerText)
							 .replace('%number%', answerNumber)
							 console.log(answerHTML);

	listContainer.innerHTML += answerHTML;
	answerNumber++;
	}


}

function checAnswer(){
	console.log('checkAnswer started!');

	const chacktRadio = listContainer.querySelector('input[type="radio"]:checked');


	if(!chacktRadio){
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(chacktRadio.value);


	questions[questionIndex]['correct'];
	if (userAnswer == questions[questionIndex]['correct'] ){
		score++;		
	}

	if(questionIndex !== questions.length - 1 ) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	}
	else{
		clearPage();
		showResults();

	}


	 function  showResults(){
		console.log('showResults startet')
	const resultsTemplate = `
	     <h2 class="title">%title%</h2>
	     <h3 class="summary">%message%</h3>
	     <p class="result">%result%</p>
		 `;
	let title, message;

	if (score === questions.length){
		title = 'поздравяем!';
		message = 'Вы ответили верно на все вопросы ! У вас есть все привычки здорового человека.';
	} else if((score * 100) / questionIndex >= 50){
		title ='Непохой резуьтат!';
		message = 'Вы дали более половины ответов праильно ! У вас есть привычки здорового человека, но стоит ознакомиться с разделом : "Факты о здоровых привычках" на нашем сайте.  ';
	}
	else{
		title = 'Вам стоит задуматься о своих привычках!';
		message = 'Пока у вас меньше половины правильных ответов. Мы советуем вам изучить раздел : "Факты о здоровых привычках"  '
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate.replace('%title%', title)
	                                    .replace('%message%', message)
										.replace('%result%', result);
    
	headerContainer.innerHTML = finalMessage;
  }
  submitBtn.blur();
  submitBtn.innerText = 'Начать заново';
  submitBtn.onclick = () => history.go();
  
}