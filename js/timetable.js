var timetable = {};

checkTasks();
checkTimetable();

function checkTasks(){
	//проверяем есть ли задачи в LocalStorage
	if (localStorage.getItem('tasks')){
		tasks = JSON.parse(localStorage.getItem('tasks'));
		document.querySelector('.weekly-list').classList.remove('hide');
		
		for (var i=0; i<tasks.length; i++){
			var listItem = document.createElement('li');
			listItem.className = 'weekly-list-item';
			listItem.innerHTML ='&#9165; '+tasks[i];
			var showForm = document.createElement('div');
			showForm.className = 'form-container';
			document.querySelector('.weekly-list').append(listItem);
			listItem.append(showForm);
			showForm.insertAdjacentHTML('beforeend', '<form class="choose-day"><h4 class="show-form">день недели &#9663;</h4><label><input type="checkbox" name="day-of-week" value="mon">понедельник</label><label><input type="checkbox" name="day-of-week" value="tue">вторник</label><label><input type="checkbox" name="day-of-week" value="wed">среда</label><label><input type="checkbox" name="day-of-week" value="thu">четверг</label><label><input type="checkbox" name="day-of-week" value="fri">пятница</label><label><input type="checkbox" name="day-of-week" value="sat">суббота</label><label><input type="checkbox" name="day-of-week" value="sun">воскресенье</label><input type="submit" value="ok" class="ok-btn"></form>');
		}
		
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<a href="weekly-plan.html" class="change-list">Изменить список дел</a>');
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<button href="weekly-plan.html" class="save-timetable">Сохранить</button>');
	}else{
		document.querySelector('.banner.no-list').classList.remove('hide');
	}
}



//раскрываем список с днями недели

var showList = document.getElementsByClassName('show-form');

for (var i=0; i<showList.length; i++){
	showList[i].onclick = function (event){
		this.parentElement.parentElement.classList.toggle('is-active');
		
	}
}

//нажатие на кнопку ок просто убирает класс active
var okBtn = document.getElementsByClassName('ok-btn');

for (var i=0; i<okBtn.length; i++){
	okBtn[i].onclick = function (event){
		event.preventDefault();
		this.parentElement.parentElement.classList.remove('is-active');
		this.parentElement.querySelector('h4').innerHTML = 'поменять дни';
		//addToTimetable();
	}
}
//скрываем выпадающий список при клике вне элемента
/*var dropList = document.getElementsByClassName('form-container');
for(var i=0; i<dropList.length; i++){
	dropList[i].onmouseup = function(){
		this.classList.remove('is-active');
		addToTimetable();
	}
}*/

document.querySelector('.save-timetable').onclick = function (event) {
	
	//проверяем, у всех ли заданий проставлены дни недели
	var checkTitles = document.querySelectorAll('h4');
	var count = 0;
	for (var i=0; i<checkTitles.length; i++){
		if (checkTitles[i].innerHTML.slice(0,4) == 'день'){
			console.log('no');
			count = 1;
			break;
		}
	}
	if (count !=1){
		//составляем два массива: один с ключами, другой со значениями
		var weeklyItems = document.querySelectorAll('.weekly-list-item');
		
		var keyTask = [];//массив ключей
		var weekDays = [];//массив значений
		
		for (var i=0; i<weeklyItems.length; i++){
			keyTask.push(weeklyItems[i].textContent.slice(2).slice(0,-67));
			var days = [];
			var selectedCheckboxes = weeklyItems[i].querySelectorAll('input[type="checkbox"]:checked');
			for (var k=0; k<selectedCheckboxes.length; k++){
				days.push(selectedCheckboxes[k].value);
			}
			weekDays.push(days);
		}
		
		for (var i=0; i<keyTask.length; i++){
			for (var k=0; k<weekDays.length; k++){
				timetable[keyTask[i]] = weekDays[i];
			}
		}
		console.log(timetable);
		localStorage.setItem('timetable', JSON.stringify(timetable));
		checkTimetable();
	}
}
		
function checkTimetable(){
	//проверяем проставлены ли даты у заданий, т.е. есть ли объект timetable
	if (localStorage.getItem('timetable')){
		document.querySelector('.weekly-timetable').classList.remove('hide');
		document.querySelector('.weekly-list').classList.add('hide');
		document.querySelector('.button-box').classList.add('hide');
		
		distributeTasks();
	}
}

function distributeTasks(){
	//распределяем задания по дням недели
	timetable = JSON.parse(localStorage.getItem('timetable'));
	console.log(timetable);
	
	//создаем массивы звданий по дням недели
	var mon = ['mon'];
	var tue = ['tue'];
	var wed = ['wed'];
	var thu = ['thu'];
	var fri = ['fri'];
	var sat = ['sat'];
	var sun = ['sun'];
	
	for (var key in timetable){
		console.log(key);
		console.log(timetable[key]);
		//сравниваем значение ключа с днем недели и записываем его в соответствующий массив

		
		for (var i=0; i<timetable[key].length; i++){
			switch(timetable[key][i]){
				case 'mon':
					mon.push(key);
					break;
				case 'tue':
					tue.push(key);
					break;
				case 'wed':
					wed.push(key);
					break;
				case 'thu':
					thu.push(key);
					break;
				case 'fri':
					fri.push(key);
					break;
				case 'sat':
					sat.push(key);
					break;
				case 'sun':
					sun.push(key);
					break;
			}
		}
		
		//сравниваем значение ключа с днем недели и записываем его в соответствующий массив

	}

	//распределяем значения из массива по дням недели в соответствующие li
		
	distributeToWeekDays(mon);
	distributeToWeekDays(tue);
	distributeToWeekDays(wed);
	distributeToWeekDays(thu);
	distributeToWeekDays(fri);
	distributeToWeekDays(sat);
	distributeToWeekDays(sun);
	
	function distributeToWeekDays(dayArray){
		//если в массиве только один элемент, обозначающий день недели, то значит тасков нет
		if(dayArray.length == 1){
			dayArray.push('Ничего не запланировано');
		}
		//убираем первый элемент массива, указывающий на день недели, но сохраняем его, чтобы потом сравнить с классом li
		var weekDay = dayArray.shift();
		
		for (var i=0; i<dayArray.length; i++){
			var newTask = document.createElement('p');
			newTask.innerHTML = '&#9165; '+dayArray[i];
			document.querySelector('li.'+weekDay).append(newTask);
		}
	}
	
	localStorage.setItem('isDone', 'true');
}