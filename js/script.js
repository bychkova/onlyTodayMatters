var today = new Date;
var weekDay = today.getDay();
var resetList = document.querySelector('a.reset');
var resetBanner = document.querySelector('.reset-banner');

if (weekDay === 0){
		resetList.onclick = function(){
			localStorage.removeItem('timetable');
			localStorage.removeItem('isDone');
	}
}else{
	resetList.style.color = '#BFACAB';
	resetList.style.cursor = 'help';
	resetList.onclick = function(){
		event.preventDefault();
		resetBanner.classList.remove('hide');
		setTimeout("resetBanner.classList.add('hide')", 3000);
	}
}