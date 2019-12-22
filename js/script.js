document.querySelector('.create-list').onclick = function (event){
	event = event || window.event;
	
	var input = document.createElement('input');
	var menu = document.querySelector('.input-box');
	menu.append(input);
	input.className = 'new-task';
	menu.insertAdjacentHTML('beforeend', '<button class="add-task">Сделаю это</button>');
	menu.insertAdjacentHTML('beforeend', '<button class="save-list">Хватит</button>');
	document.querySelector('.create-list').classList.add('hide');
	
	input.focus();
	
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
		event = event || window.event;
		
		if(input.value != ''){
			var listItem = document.createElement('li');
			listItem.className = 'weekly-list-item';
			listItem.innerHTML ='&#9165; '+input.value;
			document.querySelector('.weekly-list').append(listItem);
			document.querySelector('.weekly-list').classList.remove('hide');
			var deleteButton = document.createElement('button');
			deleteButton.className = 'delete-button';
			deleteButton.innerHTML = 'Удалить';
			listItem.append(deleteButton);
			input.value = '';
			document.querySelector('.add-task').innerHTML = 'и это';
			input.focus();
		}
		
		document.querySelector('.save-list').onclick = function (event){
			event = event || window.event;
			
				input.remove();
				document.querySelector('.add-task').remove();
				document.querySelector('.save-list').remove();
				document.querySelector('.create-list').classList.remove('hide');
		};
		
		
		var deleteButtons = document.getElementsByClassName('delete-button');
		
		var listItems = document.getElementsByClassName('weekly-list-item');
			
		for (var i=0; i<deleteButtons.length; i++){
			deleteButtons[i].onclick = function (event) {
				//console.log(deleteButtons);
				if(listItems.length == 1){
					var check = document.querySelector('.save-list');
					if(check){
						this.parentElement.remove();
						document.querySelector('.weekly-list').classList.add('hide');
					}else{
						this.parentElement.remove();
						document.querySelector('.create-list').classList.remove('hide');
						document.querySelector('.weekly-list').classList.add('hide');
					}
					
				}else{
					this.parentElement.remove();
				}
				
			}	
		}
	}	
}

