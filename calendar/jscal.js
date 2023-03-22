// creating some constants and vars !! 

let nav = 0; 
// the month is jan , if want to see dec then set the nav = -1

let clicked = null; 
// whichever day is clicked !! 


// adding events is possible via the events which is stored in the local storage !!! 
// shifting from local storage to the db via nodejs !!! 

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
// storing the arrays of events in the local storage as only strings will be stored and not the objects !! 
// and if the parser doesn't work then the events will give the null array (empty one !!) 

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// total padding days !!! 
const calendar = document.getElementById('calendar');

// creating new events 
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('backDrop');

function openModal(date) {
    clicked = date;
    const eventday = events.find(e => e.date === clicked);
    if(eventday){
        console.log("Event is exists already");
    }else{ 
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}
function load(){
    const dt = new Date(); // creating an object which contains the current d, m, y !! 

    if(nav != 0){
        dt.setMonth(new Date().getMonth() + nav);
        // if nav == -1 , take me to december !! 
        // depends on the nav pointer 
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    // store the first day of the month !! 
    const firstdaymonth = new Date(year, month, 1);
    const datestring = firstdaymonth.toLocaleDateString('en-us', {
        weekday : 'long',
        year : 'numeric', 
        month : 'numeric',
        day : 'numeric',

    });
    console.log(datestring);
    const paddingDays = weekdays.indexOf(datestring.split(', ')[0]);
    // pull the current date !!! , and want to pass the weekday only
    // splitting the array (or the object key pair into two parts)
    // only retrieving the first part and not the second part !! 

    const daysinmonth = new Date(year, month + 1, 0).getDate(); 
    // returns the total days in the month !!! 
    // +1  is the first day of the month , 0 is the last day of the previous month !!! 
    console.log(paddingDays); // working 

    document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`; 
    // Adding the January 2021 in the top left !!! 

    calendar.innerHTML = '';
    // wipes out the entire block for re-rendering !!! 

    // using the for loop !! 
    for(let i = 1; i <= paddingDays + daysinmonth; i++){
        // creating a day square !! 
        const daySquare = document.createElement('div');
        daySquare.classList.add('day'); 
        // outputs the css arrays of the list !! 

        if(i > paddingDays){
            // render less
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => openModal('${day + 1}/{month + 1}/${year}'));
            // waits for the click , and when it gets outputs it !! 
        }else{
            // render more 
            daySquare.classList.add('padding')
        }
        calendar.appendChild(daySquare); 
    }
}
function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}
function initButtons() {
    document.getElementById('nextbtn').addEventListener('click', () => {
      nav++;
      load();
    });
  
    document.getElementById('backbtn').addEventListener('click', () => {
      nav--;
      load();
    });

    document.getElementById('saveButton', () => {});
    document.getElementById('cancelButton', () => closeModal);
}
// calling load
initButtons(); 
load();
