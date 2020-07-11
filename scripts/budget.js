let incomesSummary = 0;
let outcomesSummary = 0;
let summary = 0;
let incomesArray = [];
let outcomesArray = [];
let lastIncomeId = 0;
let lastOutcomeId = 0;

function caluclateSummary(incomes, outcomes, type) {
    return incomes - outcomes;
}

function calcucaleArraySum(array) {
    let incomesSummary = 0;
    array.forEach(arg => {
        incomesSummary += Number(arg.value);
    });
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
    incomesSummary = calcucaleArraySum(incomesArray);
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
    outcomesSummary = calcucaleArraySum(outcomesArray);
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
        incomeRow.classList.add('row')
        incomeRow.style.setProperty('min-height', '40px');
        const elementName = document.createElement('div');
        elementName.classList.add('col-6')
        const elementValue = document.createElement('div');
        elementValue.classList.add('col')
        const elementButton = document.createElement('div');
        elementButton.classList.add('col')
        incomeRow.append(elementName, elementValue, elementButton);
        const nameElem = document.createElement('span');
        nameElem.innerText = entry.name;
        const valueElem = document.createElement('span');
        valueElem.innerText = entry.value;
        const removeElem = document.createElement('button');
        removeElem.classList.add('btn', 'btn-outline-danger')
        removeElem.style.setProperty('position', "absolute");
        removeElem.style.setProperty('left', "-1px");
        removeElem.innerText = 'Usuń';
        removeElem.id = entry.id;

        if (type === "income") {
            removeElem.addEventListener('click', removeIncome)
        } else {
            removeElem.addEventListener('click', removeOutcome)
        }

        elementButton.appendChild(removeElem);
        elementName.appendChild(nameElem);
        elementValue.appendChild(valueElem);
        element.appendChild(incomeRow);
    });
}

function removeIncome(event) {
    const idToDelete = Number(event.target.id);
    incomesArray = incomesArray.filter(element => element.id !== idToDelete);
    calcucaleArraySum(incomesArray);
    updateListUi("income");
}

function removeOutcome(event) {
    const idToDelete = Number(event.target.id);
    outcomesArray = outcomesArray.filter(element => element.id !== idToDelete);
    calcucaleArraySum(outcomesArray);
    updateListUi("outcome");
}