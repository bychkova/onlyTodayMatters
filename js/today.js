checkTasks();

function checkTasks(){
	if(localStorage.getItem('tasks')){
		checkTimetable();
	}else{
		document.querySelector('.banner.no-list').classList.remove('hide');
	}
}

function checkTimetable(){
	if(localStorage.getItem('timetable')){
		console.log('timetable is ready');
		document.querySelector('.weekly-list').classList.remove('hide');
		var weekDay = new Date();
		console.log(weekDay.getDay());
		
		todayTimetable();
		
		function todayTimetable(){

			//распределяем задания по дням недели
			timetable = JSON.parse(localStorage.getItem('timetable'));
			//console.log(timetable);

			//создаем массивы звданий по дням недели
			var mon = [];
			var tue = [];
			var wed = [];
			var thu = [];
			var fri = [];
			var sat = [];
			var sun = [];

			for (var key in timetable){
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
			//выбираем массив в зависимости от дня недели
			switch(weekDay.getDay()){
				case 0:
					timetibleList(sun);
					break;
				case 1:
					timetibleList(mon);
					break;
				case 2:
					timetibleList(mon);
					break;
				case 3:
					timetibleList(mon);
					break;
				case 4:
					timetibleList(mon);
					break;
				case 5:
					timetibleList(mon);
					break;
				case 6:
					timetibleList(mon);
					break;

			}
			function timetibleList(arrayList){
				if (arrayList.length === 0){
					arrayList.push('Ничего не запланировано');
				}
				for(var i=0; i<arrayList.length; i++){
					var listItem = document.createElement('li');
					listItem.className = 'weekly-list-item';
					listItem.innerHTML ='&#9165; '+arrayList[i];
					document.querySelector('.weekly-list').append(listItem);
				}
			}
		}
		
	}else{
		document.querySelector('.banner.no-timetable').classList.remove('hide');
	}
}









