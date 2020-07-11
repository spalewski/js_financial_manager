let incomesSummary = 0;
let outcomesSummary = 0;
let summary = 0;
let incomesArray = [];
let outcomesArray = [];
let lastId = 0;

function caluclateSummary(incomes, outcomes, type) {
    return incomes - outcomes;
}

function calcucaleArraySum(array) {
    let incomesSummary = 0;
    array.forEach(arg => {
        incomesSummary += Number(arg.value);
    });
    console.log(incomesSummary);
}


function addIncome() {
    let incomeValue = document.querySelector('#income-value').value;
    let incomeName = document.querySelector('#income-name').value;
    let item = {
        id: lastId,
        name: incomeName,
        value: incomeValue
    }
    lastId++;
    incomesArray.push(item);
    incomesSummary = calcucaleArraySum(incomesArray);
    updateIncomesListUi();
}

function updateIncomesListUi() {
    const incomeListElem = document.getElementById('incomes-list');
    incomeListElem.innerHTML = '';

    incomesArray.forEach(function (income) {
        const incomeRow = document.createElement('div');
        incomeRow.classList.add('row')
        const elementName = document.createElement('div');
        elementName.classList.add('col-6')
        const elementValue = document.createElement('div');
        elementValue.classList.add('col')
        const elementButton = document.createElement('div');
        elementButton.classList.add('col')
        incomeRow.append(elementName, elementValue, elementButton);
        const nameElem = document.createElement('span');
        nameElem.innerText = income.name;
        const valueElem = document.createElement('span');
        valueElem.innerText = income.value;
        const removeElem = document.createElement('button');
        removeElem.classList.add('btn', 'btn-outline-danger')
        removeElem.innerText = 'Usuń';
        removeElem.id = income.id;
        removeElem.addEventListener('click', removeIncome)


        elementButton.appendChild(removeElem);
        elementName.appendChild(nameElem);
        elementValue.appendChild(valueElem);
        incomeListElem.appendChild(incomeRow);
    });
}

function removeIncome(event) {
    const idToDelete = Number(event.target.id);
    incomesArray = incomesArray.filter(element => element.id !== idToDelete);
    calcucaleArraySum(incomesArray);
    updateIncomesListUi();
};