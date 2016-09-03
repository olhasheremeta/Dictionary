// var isEditionalOpen = false;
// function hideElement() {
// 	var targetBtn = event.target;
// 	var element = targetBtn.parentElement.parentElement.nextSibling;
// 	if (isEditionalOpen){
// 		element.style.display = 'none';
// 		isEditionalOpen = false;
// 	} else {
//     	element.style.display = 'table-row';
//     	isEditionalOpen = true;
//     }
// };
function showEditingModal(){
	document.getElementById('editing-modal').style.display = "flex";
}

function hideEditingModal(){
	document.getElementById('editing-modal').style.display = "none";
}

function addEditingTD(buffer, entry) {
	const td = document.createElement('td');
	const button = document.createElement('button');
	button.addEventListener('click', event => {
		showEditingModal();
		const inputs = document.getElementsByClassName('editing-input');
		Object.keys(entry).forEach((key, i) => {
			inputs[i].value = entry[key];
		});
	});
	td.appendChild(button);
	buffer.appendChild(td);
}

function addTranslations(buff, entry) {
	Object.keys(entry).forEach(key => {
	 const td = document.createElement('td');
	 td.innerHTML = entry[key];
	 buff.appendChild(td);
	});
}

function createRow(entry) {
	const tr = document.createElement('tr');
	const buffer = document.createDocumentFragment();
	addTranslations(buffer, entry);
	addEditingTD(buffer, entry);
	tr.appendChild(buffer);
	document.getElementById('results').appendChild(tr);
}

function onTranslateBtnClick() {
	var languageValue = document.getElementById('language').value;
	var searchValue = document.getElementById('search').value;

	var xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		var object = JSON.parse(xhr.response);
	  createRow(object);
	});
	xhr.open('GET', '/getEntry?lang=' + languageValue + '&word=' + searchValue);
	xhr.send();
}

function saveEditing() {
	hideEditingModal();
}

window.onload = () => {
	document.getElementById('translate').onclick = onTranslateBtnClick;
	document.getElementById('save-editing').onclick = saveEditing;
}


// var row = document.createElement('tr');
// row.setAttribute('class', 'entry');
// row.innerHTML = html;
// document.getElementById('results').appendChild(row);
