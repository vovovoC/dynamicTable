import json from "./data.json" assert { type: "json" };

// variables
    const tbody = document.querySelector('tbody');
    const thead = document.querySelector('thead');
    const th = document.querySelectorAll('thead th');
    const err = document.querySelector('.err');

// table create

    json.forEach((product) => {
        const values = Object.values(product);
        let row = tbody.insertRow(-1);
        row.className = 'product';

        for (const value of values) {
        let cell = row.insertCell();
        cell.innerHTML = value;
        }

        err.innerHTML = '';
    });

    let sortDirection;
    let filterInput = document.querySelector('.filter-input');
    let filterClear = document.querySelector('.filterClear');
    const product = document.querySelectorAll('.product');

// table sort

    th.forEach((col, idx) => {
    col.addEventListener('click', () => {
        sortDirection = !sortDirection;
        const rowsArrFromNodeList = Array.from(product);
        const filteredRows = rowsArrFromNodeList.filter(item => item.style.display != 'none');

        filteredRows.sort((a, b) => {
        return a.childNodes[idx].innerHTML.localeCompare(b.childNodes[idx].innerHTML, 'en', { numeric: true, sensitivity: 'base' });
        }).forEach((row) => {
        sortDirection ? tbody.insertBefore(row, tbody.childNodes[tbody.length]) : tbody.insertBefore(row, tbody.childNodes[0]);
        });

    });
    });

// table filter

    filterInput.addEventListener('keyup', () => {
        let criteria = filterInput.value.toLowerCase().trim();
        let j = 0;
    
        product.forEach((data) => {
        thead.style.opacity = '1'
        err.style.display = '';
        if (data.innerText.toLowerCase().indexOf(criteria) > -1) {
            data.style.display = '';
        } else {
            data.style.display = 'none';
            j++;
            if (j === product.length) {
            thead.style.opacity = '0.2'
            err.style.display = 'flex';
            }
        }
        });
    });

// filter clear

filterClear.addEventListener('click', () => {
    
    filterInput.value = '';

    product.forEach((data) => {
        thead.style.opacity = '1'
        err.style.display = '';
         data.style.display = '';
        });
});