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
			document.querySelector('.weekly-list').append(listItem);
			listItem.insertAdjacentHTML('beforeend', '<select name="day-of-week" class="choose-day"><option value="понедельник">понедельник</option><option value="вторник">вторник</option><option value="среда">среда</option><option value="четверг">четверг</option><option value="пятница">пятница</option><option value="суббота">суббота</option><option value="воскресенье">воскресенье</option></select>');
		}
		
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<a href="weekly-plan.html" class="change-list">Изменить список дел</a>');
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<button href="weekly-plan.html" class="save-timetable">Сохранить</button>');
	}else{
		document.querySelector('.banner.no-list').classList.remove('hide');
	}
}

document.querySelector('.save-timetable').onclick = function (event) {
	saveTimetable(event);
	//кнопка сохранить расписание после которой всё должно распеределиться по дням
	//так же записывает значение селектов в объект парами таск-день недели
}

function saveTimetable(event){
	event = event || window.event;
	//записываем выбраный день недели в объект
	var daysList = document.getElementsByClassName('choose-day');
	for (var i=0; i<daysList.length; i++){
		var keyTask = daysList[i].parentElement.textContent.slice(2).slice(0,-55);
		var valueDay = daysList[i].value;
		timetable[keyTask] = valueDay;
		
	}
	localStorage.setItem('timetable', JSON.stringify(timetable));
	document.querySelector('.weekly-list').classList.add('hide');
	document.querySelector('.button-box').classList.add('hide');
	document.querySelector('.weekly-timetable').classList.remove('hide');
	
	checkTimetable();
	
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
		//console.log(key);
		//console.log(timetable[key]);
		
		//сравниваем значение ключа с днем недели и записываем его в соответствующий массив
		switch(timetable[key]){
			case 'понедельник':
				mon.push(key);
				break;
			case 'вторник':
				tue.push(key);
				break;
			case 'среда':
				wed.push(key);
				break;
			case 'четверг':
				thu.push(key);
				break;
			case 'пятница':
				fri.push(key);
				break;
			case 'суббота':
				sat.push(key);
				break;
			case 'воскресенье':
				sun.push(key);
				break;
		}
	}
	//console.log(mon, tue, wed, thu, fri, sat, sun)
	
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






































