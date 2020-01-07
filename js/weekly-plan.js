var tasks = []; //все задания
checkTasks();
//console.log(tasks);

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
			var deleteButton = document.createElement('button');
			deleteButton.className = 'delete-button white-btn';
			deleteButton.innerHTML = 'Удалить';
			listItem.append(deleteButton);
		}
		
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<a href="timetable.html" class="create-timetable color-btn">Составить расписание</a>');
		
		deleteTask();
		
	}
}

//проверяем, сочтавлено ли расписание по дням недели
checkWeekTimetible();

function checkWeekTimetible(){
	if(localStorage.getItem('isDone')){
		//если да, то удаляем кнопки для манипулированиия расписанием
		document.querySelector('.button-box').remove();
		var toBeDeleted = document.querySelectorAll('.delete-button');
		for (var i=0; i<toBeDeleted.length; i++){
			toBeDeleted[i].remove();
		}
		//и добавляем ссылку на само расписание
		document.querySelector('.show-timetable').classList.remove('hide');
	}else{
		document.querySelector('.create-list').onclick = function (event){
		//создание списка задач
		event = event || window.event;

		//checkTasks();
		//console.log(tasks);

		var listCheck = document.querySelector('.create-timetable');
		var input = document.createElement('input');
		var menu = document.querySelector('.input-box');

		if (listCheck){
			listCheck.classList.add('hide');
			createList();
		}else{
			createList();
		}

		function createList(){
			//вывод input для пользовательского ввода
			menu.append(input);
			input.className = 'new-task';
			menu.insertAdjacentHTML('beforeend', '<button class="add-task color-btn-narrow">Сделаю это</button>');
			menu.insertAdjacentHTML('beforeend', '<button class="save-list color-btn-narrow">Хватит</button>');
			document.querySelector('.create-list').classList.add('hide');
			input.focus();
		}



		document.querySelector('.add-task').onclick = function (event) {
			addTask(event);
		}

		document.querySelector('input').onblur = function(){
			addTask(event);
		}

		document.querySelector('input').addEventListener('keydown', function (event){
			if (event.keyCode === 13){
				addTask(event);
			}
		})

		function addTask(event){
			//добавление задания в список
			event = event || window.event;

			if(input.value != ''){
				var listItem = document.createElement('li');
				listItem.className = 'weekly-list-item';
				listItem.innerHTML ='&#9165; '+input.value;
				document.querySelector('.weekly-list').append(listItem);
				document.querySelector('.weekly-list').classList.remove('hide');
				tasks.push(input.value);
				console.log(tasks);
				localStorage.setItem('tasks', JSON.stringify(tasks));
				var deleteButton = document.createElement('button');
				deleteButton.className = 'delete-button white-btn';
				deleteButton.innerHTML = 'Удалить';
				listItem.append(deleteButton);
				input.value = '';
				document.querySelector('.add-task').innerHTML = 'и это';
				input.focus();

				//console.log(tasks);
			}


			document.querySelector('.save-list').onclick = function (event){
				//сохранение списка задач
				event = event || window.event;

				if(document.querySelector('.weekly-list-item')){
					input.remove();
					document.querySelector('.add-task').remove();
					document.querySelector('.save-list').remove();
					document.querySelector('.create-list').classList.remove('hide');
					document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<a href="timetable.html" class="create-timetable color-btn">Составить расписание</a>');
				}else{
					input.remove();
					document.querySelector('.add-task').remove();
					document.querySelector('.save-list').remove();
					document.querySelector('.create-list').classList.remove('hide');
				}

			};


			deleteTask();
		}	
	}
	}
}




function deleteTask(){
	//создаем кнопку и вешаем на нее событие
	var deleteButtons = document.getElementsByClassName('delete-button');

	var listItems = document.getElementsByClassName('weekly-list-item');

	for (var i=0; i<deleteButtons.length; i++){
		deleteButtons[i].onclick = function (event) {
			if(listItems.length == 1){
				var check = document.querySelector('.save-list');
				if(check){
					this.parentElement.remove();
					localStorage.clear();
					var example = this.parentElement.textContent.slice(2).slice(0,-7);
					for(var k=0; k<=tasks.length;k++){
						if (tasks[k]===example){
							tasks.splice(k,1);
						}
					}
					document.querySelector('.weekly-list').classList.add('hide');
				}else{
					this.parentElement.remove();
					localStorage.clear();
					var example = this.parentElement.textContent.slice(2).slice(0,-7);
					for(var k=0; k<=tasks.length;k++){
						if (tasks[k]===example){
							tasks.splice(k,1);
						}
					}
					document.querySelector('.create-list').classList.remove('hide');
					document.querySelector('.weekly-list').classList.add('hide');
					document.querySelector('.create-timetable').classList.add('hide');
				}

			}else{
				this.parentElement.remove();
				var example = this.parentElement.textContent.slice(2).slice(0,-7);
				for(var k=0; k<=tasks.length;k++){
					if (tasks[k]===example){
						tasks.splice(k,1);
						localStorage.setItem('tasks', JSON.stringify(tasks));
					}
				}
				console.log(tasks);
			}

		}	
	}
}