let incomesArray = JSON.parse(localStorage.getItem('incomes') || '[]');
let outcomesArray = JSON.parse(localStorage.getItem('outcomes') || '[]');
let incomesSummary = (incomesArray.length > 0) ? calculateArraySum(incomesArray) : 0;
let outcomesSummary = (outcomesArray.length > 0) ? calculateArraySum(outcomesArray) : 0;
let lastIncomeId = (incomesArray.length > 0) ? getMaxId(incomesArray) : 0;
let lastOutcomeId = (outcomesArray.length > 0) ? getMaxId(incomesArray) : 0;
updateListUi('income');
updateListUi('outcome');

function getMaxId(array) {
    let lastId = 0;
    array.forEach(element => {
        if (element.id > lastId) {
            lastId = element.id;
        }
    })
    return lastId;
}

function calculateArraySum(array) {
    let summary = 0;
    array.forEach(arg => {
        summary += Number(arg.value);
    });
    return summary;
}


function addIncome() {
    let incomeValue = document.querySelector('#income-value').value;
    let incomeName = document.querySelector('#income-name').value;
    let item = {
        id: lastIncomeId,
        name: incomeName,
        value: incomeValue
    }
    lastIncomeId++;
    incomesArray.push(item);
    localStorage.setItem("incomes", JSON.stringify(incomesArray));
    incomesSummary = calculateArraySum(incomesArray);
    updateListUi("income");
}

function addOutcome() {
    let outcomeValue = document.querySelector('#outcome-value').value;
    let outcomeName = document.querySelector('#outcome-name').value;
    let item = {
        id: lastOutcomeId,
        name: outcomeName,
        value: outcomeValue
    }
    lastOutcomeId++;
    outcomesArray.push(item);
    localStorage.setItem("outcomes", JSON.stringify(outcomesArray));
    outcomesSummary = calculateArraySum(outcomesArray);
    updateListUi('outcome');
}

function removeIncome(event) {
    let idToDelete = event.target.id;
    idToDelete = Number(idToDelete.substr(7, idToDelete.length));
    incomesArray = incomesArray.filter(element => element.id !== idToDelete);
    incomesSummary = calculateArraySum(incomesArray);
    localStorage.setItem("incomes", JSON.stringify(incomesArray));
    updateListUi('income');
}

function removeOutcome(event) {
    let idToDelete = event.target.id;
    idToDelete = Number(idToDelete.substr(7, idToDelete.length));
    outcomesArray = outcomesArray.filter(element => element.id !== idToDelete);
    outcomesSummary = calculateArraySum(outcomesArray);
    localStorage.setItem("outcomes", JSON.stringify(outcomesArray));
    updateListUi('outcome');
}

function editIncome(event) {
    updateListUi('income');
    let idToEdit = event.target.id;
    idToEdit = Number(idToEdit.substr(5, idToEdit.length));
    const elementToEdit = document.body.querySelector(".income_" + idToEdit);
    elementToEdit.innerHTML = "<div class='row edit-row'>" +
        "<div class='col-6'>" +
        "<input class='form-control' id='income-name-edit' placeholder='Nazwa wydatku' type='text'>" +
        "</div>" +
        "<div class='col'>" +
        "<input class='form-control' id='income-value-edit' placeholder='Kwota' type='number'>" +
        "</div>" +
        "<div class='col'>" +
        "<button class='btn btn-primary' id='submit-income-edit' onclick='saveEditIncome(" + idToEdit + ")'>Zapisz</button>" +
        "</div>" +
        "</div>";
}

function saveEditIncome(id) {
    let incomeValue = document.querySelector('#income-value-edit').value;
    let incomeName = document.querySelector('#income-name-edit').value;
    let item = {
        id: id,
        name: incomeName,
        value: incomeValue
    }
    incomesArray.find(function (entry, index) {
        if (entry.id === id)
            incomesArray[index] = item;
    });
    incomesSummary = calculateArraySum(incomesArray);
    localStorage.setItem("incomes", JSON.stringify(incomesArray));
    updateListUi('income');
}


function editOutcome(event) {
    updateListUi('outcome');
    let idToEdit = event.target.id;
    idToEdit = Number(idToEdit.substr(5, idToEdit.length));
    const elementToEdit = document.body.querySelector(".outcome_" + idToEdit);
    elementToEdit.innerHTML = "<div class='row edit-row'>" +
        "<div class='col-6'>" +
        "<input class='form-control' id='outcome-name-edit' placeholder='Nazwa wydatku' type='text'>" +
        "</div>" +
        "<div class='col'>" +
        "<input class='form-control' id='outcome-value-edit' placeholder='Kwota' type='number'>" +
        "</div>" +
        "<div class='col'>" +
        "<button class='btn btn-primary' id='submit-outcome-edit' onclick='saveEditOutcome(" + idToEdit + ")'>Zapisz</button>" +
        "</div>" +
        "</div>";

}

function saveEditOutcome(id) {
    let outcomeValue = document.querySelector('#outcome-value-edit').value;
    let outcomeName = document.querySelector('#outcome-name-edit').value;
    let item = {
        id: id,
        name: outcomeName,
        value: outcomeValue
    }
    outcomesArray.find(function (entry, index) {
        if (entry.id === id)
            outcomesArray[index] = item;
    });
    outcomesSummary = calculateArraySum(outcomesArray);
    localStorage.setItem("outcomes", JSON.stringify(outcomesArray));
    updateListUi('outcome');
}

function updateListUi(type) {
    const incomeListElem = document.getElementById('incomes-list');
    const outcomeListElem = document.getElementById('outcomes-list');
    if (type === 'income') {
        incomeListElem.innerHTML = '';
    } else {
        outcomeListElem.innerHTML = '';
    }

    let array = (type === "income") ? incomesArray : outcomesArray;
    let element = (type === "income") ? incomeListElem : outcomeListElem;

    array.forEach(function (entry) {
        const incomeRow = document.createElement('div');
        incomeRow.classList.add('row', type + '_' + entry.id);
        incomeRow.style.setProperty('min-height', '40px');
        const elementName = document.createElement('div');
        elementName.classList.add('col-6')
        const elementValue = document.createElement('div');
        elementValue.classList.add('col')
        const elementButton = document.createElement('div');
        elementButton.classList.add('col')
        const elementEditButton = document.createElement('div');
        elementEditButton.classList.add('col')
        incomeRow.append(elementName, elementValue, elementEditButton, elementButton);
        const nameElem = document.createElement('span');
        nameElem.innerText = entry.name;
        const valueElem = document.createElement('span');
        valueElem.innerText = entry.value;
        const removeElem = document.createElement('button');
        removeElem.classList.add('btn', 'btn-outline-danger')
        removeElem.innerText = 'Usuń';
        removeElem.id = 'remove_' + entry.id;

        const editElem = document.createElement('button');
        editElem.classList.add('btn', 'btn-outline-primary')
        editElem.innerText = 'Edytuj';
        editElem.id = 'edit_' + entry.id;

        if (type === "income") {
            removeElem.addEventListener('click', removeIncome)
            editElem.addEventListener('click', editIncome)
        } else {
            removeElem.addEventListener('click', removeOutcome)
            editElem.addEventListener('click', editOutcome)
        }

        elementButton.appendChild(removeElem);
        elementEditButton.appendChild(editElem)
        elementName.appendChild(nameElem);
        elementValue.appendChild(valueElem);
        element.appendChild(incomeRow);
    });
    setListSummary(type)
    setSummary();
}

function setListSummary(type) {
    if (type === "income") {
        const incomeSummary = document.getElementById('income-summary-span');
        incomeSummary.innerText = '';
        incomeSummary.innerText = incomesSummary;
    } else {
        const outcomeSummary = document.getElementById('outcome-summary-span');
        outcomeSummary.innerText = '';
        outcomeSummary.innerText = outcomesSummary
    }
}

function setSummary() {
    let summary = incomesSummary - outcomesSummary;
    const summaryDiv = document.body.querySelector(".message");
    summaryDiv.innerHTML = '';
    summaryDiv.innerHTML = 'Możesz jeszcze wydać ' + summary + ' zł';
}