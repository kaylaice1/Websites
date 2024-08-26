document.addEventListener('DOMContentLoaded', function () {
    const rolePopup = document.getElementById('role-popup');
    const passwordPopup = document.getElementById('password-popup');
    const ownerButton = document.getElementById('owner-button');
    const clientButton = document.getElementById('client-button');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const calendar = document.getElementById('calendar');
    const prevYearButton = document.getElementById('prev-year');
    const nextYearButton = document.getElementById('next-year');
    const viewDayButton = document.getElementById('view-day');
    const viewWeekButton = document.getElementById('view-week');
    const viewMonthButton = document.getElementById('view-month');
    const currentYearElement = document.getElementById('current-year');
    const saveButtonContainer = document.getElementById('save-button-container');
    const saveButton = document.getElementById('save-button');
    const password = "ownerpassword"; //change password

    let currentYear = new Date().getFullYear();
    let currentView = 'month';

    rolePopup.style.display = 'flex';

    ownerButton.addEventListener('click', function () {
        rolePopup.style.display = 'none';
        passwordPopup.style.display = 'flex';
    });

    clientButton.addEventListener('click', function () {
        rolePopup.style.display = 'none';
        renderCalendar(false);
    });

    passwordSubmit.addEventListener('click', function() {
        if (passwordInput.value === password) {
            passwordPopup.style.display = 'none';
            renderCalendar(true);
            saveButtonContainer.style.display = 'block';
        } else {
            alert('Incorrect password. Please try again or click client to see calender');
        }
    });

    prevYearButton.addEventListener('click', function () {
        currentYear--;
        updateYearDisplay();
        renderCalendar(isEditable());
    });

    nextYearButton.addEventListener('click' , function () {
        currentYear++;
        updateYearDisplay();
        renderCalendar(isEditable());
    });

    viewDayButton.addEventListener('click' , function() {
        currentView = 'day';
        updateViewButtons();
        renderCalendar(isEditable());
    });

    viewMonthButton.addEventListener('click' , function() {
        currentView = 'month';
        updateViewButtons();
        renderCalendar(isEditable());
    });

    saveButton.addEventListener('click' , function () {
        saveCalendarData();
        renderCalendar(false);
        saveButtonContainer.style.display = 'none';
    });

    function updateYearDisplay() {
        currentYearElement.textContent = currentYear;
    }

    function updateViewButtons() {
        viewDayButton.classList.remove('active');
        viewWeekButton.classList.remove('active');
        viewMonthButton.classList.remove('active');
        if (currentView === 'day') viewDayButton.classList.add('active');
        if (currentView === 'week') viewWeekButton.classList.add('active');
        if (currentView === 'month') viewMonthButton.classList.add('active');
    }
    function isEditable() {
        return passwordPopup.style.display === 'none' && rolePopup.style.display === 'none';
    }

    function renderCalendar(isEditable) {
        calendar.innerHTML = '';

        if (currentView === 'month') {
            renderMonthView(isEditable);
        } else if (currentView === 'week') {
            renderWeekView(isEditable);
        } else {
            renderDayView(isEditable);
        }
    }

    function renderMonthView(isEditable) {
        const datsInMonth = new Data(currentYear, 11, 31).getDate();
        const firstDayOfMonth = new Data(currentYear, 0, 1).getDay();
        for(let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            calendar.appendChild(emptyDiv);
        }
        for (let i = 0; i < firstDayOfMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = i;

            if (isEditable) {
                dayDiv.classList.add('editable');
                dayDiv.contentEditable = "true";
                dayDiv.addEventListener('blur' , function() {
                    console.log('Content for day ${i}: ${dayDiv.textContent}');
                });
            } else {
                dayDiv.addEventListener('click' , function () {
                    alert('Events for day ${i}: No Events');
                });
            }
    

            calendar.appendChild(dayDiv);
        }
    }

    function renderWeekView(isEditable) {
        for (let i = 0; i < 7; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = 'Day ${i + 1}';

            if (isEditable) {
                dayDiv.classList.add('editable');
                dayDiv.contentEditable = "true";
                dayDiv.addEventListener('blur' , function () {
                    console.log('Content for week day ${i + 1}: No events');
                });
            }

            calendar.appendChild(dayDiv);
        }
    }

    function renderDayView(isEditable) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = 'Selected Day';

        if (isEditable) {
            dayDiv.classList.add('editable');
            dayDiv.contentEditable = "true";
            dayDiv.addEventListener('blur' , function () {
                console.log('Content for selected day: ${dayDiv.textContent}');
            });
        } else {
            dayDiv.addEventListener('click' , function (){
                alert('Events for selected day: No events')
            });
        }

        calendar.appendChild(dayDiv);
    }

    function saveCalendarData() {
        const days = document.querySelectorAll('.calendar-day.editable');
        let calendarData = {};
        days.forEach((day, index) => {
            calendarData['day${index + 1}'] = day.textContent;
        });

        localStorage.setItem('calendarData' , JSON.stringify(calendarData));
        alert('Calendar data saved successfully!');
    }

    updateYearDisplay();
    updateViewButtons();
});