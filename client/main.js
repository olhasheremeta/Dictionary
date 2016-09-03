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
	button.innerHTML = 'Edit';
	button.addEventListener('click', event => {
		showEditingModal();
		const inputs = document.getElementsByClassName('editing-input');
		const keys = Object.keys(entry);
		for (let i = 1; i <= keys.length; i++) {
			inputs[i - 1].value = entry[keys[i]];
		}
	});
	td.appendChild(button);
	buffer.appendChild(td);
}

function addTranslations(tr, entry) {
	const template = '<td>' + entry.eng + '</td>' +
									 '<td>' + entry.ukr + '</td>' +
									 '<td>' + entry.ger + '</td>' +
									 '<td>' + entry.pol + '</td>' +
									 '<td>' + entry.rus + '</td>';
	tr.innerHTML = template;
}

function createRow(entry) {
	const tr = document.createElement('tr');
	const buffer = document.createDocumentFragment();
	addTranslations(tr, entry);
	addEditingTD(buffer, entry);
	tr.appendChild(buffer);
	const results = document.getElementById('results')
	results.insertBefore(tr, results.childNodes[0]);
}

function cleanInput() {
	const input = document.getElementById('search');
	input.value = '';
	input.focus();
	document.getElementById('translate').disabled = true;
}

function onTranslateBtnClick() {
	var languageValue = document.getElementById('language').value;
	var searchValue = document.getElementById('search').value;
	if (!searchValue) return;

	var xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		if (xhr.response) {
			var object = JSON.parse(xhr.response);
			createRow(object);
		} else {
			console.log('Error: no such an entry in the data base');
		}
		cleanInput();
	});
	xhr.open('GET', '/getEntry?lang=' + languageValue + '&word=' + searchValue);
	xhr.send();
}

function onInputChange(event) {
	const value = event.target.value;
	if (event.keyCode === 13 && value) {
		onTranslateBtnClick()
	} else {
		const button = document.getElementById('translate');
		button.disabled = !value;
	}
}

function focusInput() {
	document.getElementById('search').focus();
}

function saveEditing() {
	hideEditingModal();
}

window.onload = () => {
	document.getElementById('translate').onclick = onTranslateBtnClick;
	document.getElementById('save-editing').onclick = saveEditing;
	document.getElementById('search').onkeydown = onInputChange;
	document.getElementById('language').onchange = focusInput;
}
