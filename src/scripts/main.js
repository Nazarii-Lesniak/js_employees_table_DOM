'use strict';

const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');

tbody.addEventListener('click', (rowSelection) => {
  rowSelection.preventDefault();

  const clickedRow = rowSelection.target.closest('tr');
  const activeRow = document.querySelector('.active');

  if (activeRow !== null) {
    activeRow.classList.remove('active');
  }

  if (!clickedRow) {
    return;
  }

  clickedRow.classList.add('active');
});

let activeColumnTitle = 0;
let isAscending = false;

function getSalaryValue(salaryString) {
  return Number(salaryString.replace(/[^0-9.-]+/g, ''));
}

thead.addEventListener('click', (sortingColumn) => {
  sortingColumn.preventDefault();

  const rowsArrayData = Array.from(tbody.querySelectorAll('tr'));
  const title = sortingColumn.target.closest('th');
  const index = title.cellIndex;

  if (!title) {
    return;
  }

  if (index === activeColumnTitle) {
    activeColumnTitle = index;
    isAscending = !isAscending;
  } else {
    activeColumnTitle = index;
    isAscending = true;
  }

  rowsArrayData.sort((firstRow, secondRow) => {
    const firstValue = firstRow.cells[index].textContent;
    const secondValue = secondRow.cells[index].textContent;

    let result = 0;

    if (index === 3 || index === 4) {
      result = getSalaryValue(firstValue) - getSalaryValue(secondValue);
    } else {
      result = firstValue.localeCompare(secondValue);
    }

    return isAscending ? result : -result;
  });

  tbody.append(...rowsArrayData);
});
