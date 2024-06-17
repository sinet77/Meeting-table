let currentStartDate = new Date(2024, 5, 17);

const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const meetings = [{
    time: "09:00",
    day: "PONIEDZIAŁEK",
    date: "17.06.2024",
    meetingName: "Spotkanie z kontrahentem",
    contractor: "Alfreds Futterkiste"
  },
  {
    time: "11:00",
    day: "WTOREK",
    date: "18.06.2024",
    meetingName: "Spotkanie z kontrahentem",
    contractor: "Maria Anders"
  },
  {
    time: "13:00",
    day: "ŚRODA",
    date: "19.06.2024",
    meetingName: "Wizyta kontrahenta",
    contractor: "Germany"
  },
  {
    time: "15:00",
    day: "CZWARTEK",
    date: "20.06.2024",
    meetingName: "Wizyta kontrahenta",
    contractor: "Germany"
  },
  {
    time: "10:00",
    day: "PIĄTEK",
    date: "21.06.2024",
    meetingName: "Wizyta kontrahenta",
    contractor: "Italy"
  },
    {
    time: "16:00",
    day: "WTOREK",
    date: "25.06.2024",
    meetingName: "Wizyta kontrahenta",
    contractor: "Poland"
  }
];

function getWeekDates(startDate) {
  let weekDates = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < 5; i++) {
    weekDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
}

function displayWeekDates(dates) {


  const tableHeader = document.querySelector('#meetingsTable thead tr');
  tableHeader.innerHTML = '<th class="hour-width">Godzina</th>';

  dates.forEach(date => {
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('date-container');

    const weekday = document.createElement('div');
    weekday.classList.add('weekday');
    weekday.textContent = date.toLocaleDateString('pl-PL', {
      weekday: 'long'
    }).toUpperCase();

    const fullDate = document.createElement('div');
    fullDate.classList.add('date');
    fullDate.textContent = date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    dataContainer.appendChild(weekday);
    dataContainer.appendChild(fullDate);


    const th = document.createElement('th');
    th.innerHTML = `${weekday.textContent}<br>${fullDate.textContent}`;
    tableHeader.appendChild(th);
  });

  displayMeetings(dates);
}

function displayMeetings(dates) {
  const tbody = document.querySelector('#meetingsTable tbody');
  tbody.innerHTML = '';

  for (let hour = 7; hour <= 20; hour++) {
    const row = document.createElement('tr');

    const hourCell = document.createElement('td');
    hourCell.className = 'same-width';
    hourCell.textContent = `${hour}:00`;
    row.appendChild(hourCell);

    dates.forEach(date => {
      const cell = document.createElement('td');
      cell.className = 'same-width';

      const formattedDate = date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      meetings.forEach(meeting => {
        if (meeting.date === formattedDate && meeting.day === date.toLocaleDateString('pl-PL', {
            weekday: 'long'
          }).toUpperCase() && parseInt(meeting.time.split(':')[0]) === hour) {
          cell.textContent = `${meeting.contractor}, ${meeting.meetingName}`;
        }
      });

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  }
}

function showNextWeek() {
  currentStartDate.setDate(currentStartDate.getDate() + 7);
  let weekDates = getWeekDates(currentStartDate);
  displayWeekDates(weekDates);


}

function showPrevWeek() {

  currentStartDate.setDate(currentStartDate.getDate() - 7);
  let weekDates = getWeekDates(currentStartDate);
  displayWeekDates(weekDates);


}

displayWeekDates(getWeekDates(currentStartDate));

nextButton.addEventListener('click', showNextWeek);
prevButton.addEventListener('click', showPrevWeek);