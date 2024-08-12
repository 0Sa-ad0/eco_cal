document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('currency-table-body');
    const darkModeSwitch = document.getElementById('dark-mode-switch');

    // Load table data from localStorage
    function loadTableData() {
        const savedData = localStorage.getItem('currencyTableData');
        if (savedData) {
            JSON.parse(savedData).forEach(row => addRow(row.date, row.time, row.currency));
        } else {
            addRow();  // Add an initial empty row if no data is saved
        }
    }
    
    // Dark mode toggle
    darkModeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    });

    // Load dark mode preference
    function loadDarkModePreference() {
        const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
        document.body.classList.toggle('dark-mode', darkModeEnabled);
        darkModeSwitch.checked = darkModeEnabled;
    }
    
    function createDateDropdown() {
        const container = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'date';
    
        const dayLabel = document.createElement('span');
        dayLabel.style.marginLeft = '10px';  // Add some space between the date input and the day label
        dayLabel.textContent = '';  // Initial empty text
    
        input.addEventListener('change', function() {
            const selectedDate = new Date(input.value);
            if (!isNaN(selectedDate.getTime())) {  // Check if the date is valid
                const options = { weekday: 'long' };  // Format options to get the day of the week
                dayLabel.textContent = selectedDate.toLocaleDateString(undefined, options);
            } else {
                dayLabel.textContent = '';  // Clear the label if no date is selected
            }
        });
    
        container.appendChild(input);
        container.appendChild(dayLabel);
    
        return container;
    }
    

    function createTimeDropdown() {
        const input = document.createElement('input');
        input.type = 'time';
        input.step = 60;  // Step in seconds, so this allows selection in 1-minute increments
        return input;
    }
    

    function addRow(currency = '') {
        const tr = document.createElement('tr');

        const tdDate = document.createElement('td');
        tdDate.appendChild(createDateDropdown());
        tr.appendChild(tdDate);

        const tdTime = document.createElement('td');
        tdTime.appendChild(createTimeDropdown());
        tr.appendChild(tdTime);

        const tdCurrency = document.createElement('td');
        const inputCurrency = document.createElement('input');
        inputCurrency.type = 'text';
        inputCurrency.value = currency;
        inputCurrency.placeholder = 'Enter Currency';
        tdCurrency.appendChild(inputCurrency);
        tr.appendChild(tdCurrency);

        const tdAddRow = document.createElement('td');
        tdAddRow.classList.add('add-row');
        tdAddRow.textContent = '+';
        tdAddRow.addEventListener('click', () => addRow());
        tr.appendChild(tdAddRow);

        tableBody.appendChild(tr);
    }

    // Add an initial row
    addRow();

    // Load data on page load
    loadTableData();
    loadDarkModePreference();
});
