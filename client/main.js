const GLOBAL_ELEMENTS = {};

window.onload = () => {
	GLOBAL_ELEMENTS.translate = document.getElementById('translate');
	GLOBAL_ELEMENTS.saveEditing = document.getElementById('save-editing');
	GLOBAL_ELEMENTS.search = document.getElementById('search');
	GLOBAL_ELEMENTS.language = document.getElementById('language');
	GLOBAL_ELEMENTS.closePopup = document.getElementById('close-popup');
	GLOBAL_ELEMENTS.editingModal = document.getElementById('editing-modal');
	GLOBAL_ELEMENTS.results = document.getElementById('results');

	assigneListeners();
}

function assigneListeners() {
	GLOBAL_ELEMENTS.closePopup.onclick = toggleEditingModal;
	GLOBAL_ELEMENTS.language.onchange = focusInput;
	GLOBAL_ELEMENTS.search.onkeydown = onInputChange;
	GLOBAL_ELEMENTS.saveEditing.onclick = saveEditing;
	GLOBAL_ELEMENTS.translate.onclick = onTranslateBtnClick;
}

function addEditingTD(buffer, entry) {
	const td = document.createElement('td');
	const button = document.createElement('button');

	button.innerHTML = 'Edit';
	button.addEventListener('click', event => {
		toggleEditingModal();
		const inputs = document.getElementsByClassName('editing-input');
		const keys = Object.keys(entry);
		GLOBAL_ELEMENTS.editingModal.setAttribute('data-id', entry._id);
		for (let i = 1; i < keys.length; i++) {
			inputs[i - 1].setAttribute('data-key', keys[i]);
			inputs[i - 1].value = entry[keys[i]];
		}
	});
	td.appendChild(button);
	buffer.appendChild(td);
}

function addTranslations(tr, entry) {
	const template = `<td>${entry.eng}</td><td>${entry.ukr}</td>` +
									 `<td>${entry.ger}</td><td>${entry.pol}</td>` +
									 `<td>${entry.rus}</td>`;
	tr.innerHTML = template;
}

function createRow(entry) {
	const tr = document.createElement('tr');
	const results = GLOBAL_ELEMENTS.results;
	const buffer = document.createDocumentFragment();

	addTranslations(tr, entry);
	addEditingTD(buffer, entry);
	tr.appendChild(buffer);
	results.insertBefore(tr, results.childNodes[0]);
}

function cleanInput() {
	GLOBAL_ELEMENTS.search.value = '';
	GLOBAL_ELEMENTS.search.focus();
	GLOBAL_ELEMENTS.translate.disabled = true;
}

function onTranslateBtnClick() {
	var languageValue = GLOBAL_ELEMENTS.language.value;
	var searchValue = GLOBAL_ELEMENTS.search.value;

	if (!GLOBAL_ELEMENTS.search) return;

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
		onTranslateBtnClick();
	} else {
		GLOBAL_ELEMENTS.translate.disabled = !value;
	}
}

function focusInput() {
	GLOBAL_ELEMENTS.search.focus();
}

function toggleEditingModal (){
	GLOBAL_ELEMENTS.editingModal.classList.toggle('hidden');
}

function editEntry(entry) {
	console.log(entry);
	var xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		if (xhr.response) {
			console.log(xhr.response);
		} else {
			console.log('Error: we can\'t save this entry now');
		}
	});
	xhr.open('PUT', '/editEntry');
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(entry));
}

function saveEditing() {
	const inputs = document.getElementsByClassName('editing-input');
	const entry = {
		_id: GLOBAL_ELEMENTS.editingModal.getAttribute('data-id'),
	}
	for (let i = 0; i < inputs.length; i++) {
		const key = inputs[i].getAttribute('data-key');
		const value = inputs[i].value;
		entry[key] = value;
	}

	editEntry(entry);
}
