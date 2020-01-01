var tasks = []; //все задания
checkTasks();
console.log(tasks);

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
		menu.insertAdjacentHTML('beforeend', '<button class="add-task">Сделаю это</button>');
		menu.insertAdjacentHTML('beforeend', '<button class="save-list">Хватит</button>');
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
			deleteButton.className = 'delete-button';
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
			
			input.remove();
			document.querySelector('.add-task').remove();
			document.querySelector('.save-list').remove();
			document.querySelector('.create-list').classList.remove('hide');
			document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<button class="create-timetable">Составить расписание</button>');
		};
		
		
		deleteTask();
	}	
}

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
			deleteButton.className = 'delete-button';
			deleteButton.innerHTML = 'Удалить';
			listItem.append(deleteButton);
		}
		
		document.querySelector('.button-box').insertAdjacentHTML('beforeend', '<button class="create-timetable">Составить расписание</button>');
		
		deleteTask();
		
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