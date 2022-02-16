const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body');

//fetchData call will go get 12 random people from the U.S. and return that result with JSON data.
fetchData('https://randomuser.me/api/?nat=us&results=12')
    .then(data => createEmployeeCards(data.results))
    .then(createButtonListeners)
    .catch(error => console.log('Something went wrong', error))

/**
 * Will fetch data from JSON file, parse the response and check for errors.
 *
 * @param {url} the url to fetch data from.
 */
function fetchData(url){
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .catch(error => console.log('Looks like a problem', error))
}

/**
 * Returns the resolve response of the Promise if response.ok is true 
 * Otherwise it returns the rejecting statusText.
 * @param {Promise response} the response from Promise
 * @return {Promise response} The response of the Promise if response.ok is true, error status if false.
 */
function checkStatus(response) {
    if(response.ok){
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
    
/**
 * Takes the data from JSON fetch and parses it to personData object. These objects are put returned in employees array.
 *
 * @param {JSON data} JSON file with data on random employees
 * @return {Object array} returns employee data needed in an Object array.
 */
function getPersonData(data){
    employees = [];
    for(let i = 0; i < data.length; i++){
        const person = data[i];
        const personData = {
            gender : person.gender,
            firstName : person.name.first,
            lastName : person.name.last,
            email : person.email,
            streetNumber : person.location.street.number,
            streetName : person.location.street.name,
            city : person.location.city,
            state : person.location.state,
            zip : person.location.postcode,
            birthday : `${person.dob.date.substring(5,7)}/${person.dob.date.substring(8,10)}/${person.dob.date.substring(0,4)}`,
            picture : person.picture.large,
            cell : person.cell
        };
        employees.push(personData);
        
    }
    return employees;
}

/**
 * Create the employee cards and employee modals, then adds them to the DOM. 
 *
 * @param {Promise data.results} Takes the data, calls getPersonalData to create Object array.
 */

function createEmployeeCards(data){
    const employees = getPersonData(data);
    
    let html = '';
    let modal = '';
    
    for(let employee of employees){   
        html += '<div class="card">';
        html += '<div class="card-img-container">';
        html += `<img class="card-img" src='${employee.picture}' alt="profile picture">`;
        html += '</div>';
        html += '<div class="card-info-container">';
        html += `<h3 id= class="card-name cap">${employee.firstName} ${employee.lastName}</h3>`;
        html += `<p class="card-text">${employee.email}</p>`;
        html += `<p class="card-text cap">${employee.city}, ${employee.state}</p>`;
        html += '</div>';
        html += '</div>';

        modal += '<div class="modal-container" style="display:none">';
        modal += `<div class="modal">`;
        modal += `<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
        modal += `<div class="modal-info-container">`;
        modal += `<img class="modal-img" src="${employee.picture}" alt="profile picture">`;
        modal += `<h3 id="name" class="modal-name cap">${employee.firstName} ${employee.lastName}</h3>`;
        modal += `<p class="modal-text">${employee.email}</p>`;
        modal += `<p class="modal-text cap">${employee.city}</p>`;
        modal += `<hr>`;
        modal += `<p class="modal-text">${employee.cell.substring(0,5)} ${employee.cell.substring(6)}</p>`;
        modal += `<p class="modal-text">${employee.streetNumber} ${employee.streetName}, ${employee.city}, ${employee.state} ${employee.zip}</p>`;
        modal += `<p class="modal-text">Birthday: ${employee.birthday}</p>`;
        modal += `</div>`;
        modal += `</div>`;
        modal += `<div class="modal-btn-container">`;
        modal += `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
        modal += `<button type="button" id="modal-next" class="modal-next btn">Next</button>`;
        modal += `</div>`;
        modal += `</div>`;
    }
    
    gallery.insertAdjacentHTML('beforeend', html);
    gallery.insertAdjacentHTML('afterend', modal);
    
}

/**
 * Creates button listeners for opening employee modals, closing modals, next button on modal, prev button on modal.
 */
function createButtonListeners(){
    const modalCards = document.getElementsByClassName('modal-container');
    const cards = document.getElementsByClassName('card');
    const closeModal = document.getElementsByClassName('modal-close-btn');
    const nextButton = document.getElementsByClassName('modal-next');
    const prevButton = document.getElementsByClassName('modal-prev');

    //when click on card from main page, will show employee modal
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', e => {
            modalCards[i].style.display = 'block';
        })
    }

    //when click on X in modal, will close modal
    for(let i = 0; i < closeModal.length; i++){
        closeModal[i].addEventListener('click', e => {
            closeModalCards(modalCards, i);
        })
    }

    //when click on the next button in modal, will go to the next modal
    for(let i = 0; i < nextButton.length; i++){
        nextButton[i].addEventListener('click', e => {
            clickNextButton(modalCards, i);
        })
    }

    //when click on the prev button in modal, will go to the prev modal
    for(let i = 0; i < prevButton.length; i++){
        prevButton[i].addEventListener('click', e => {
            clickPrevButton(modalCards, i)
        })
    }

    //Helper functions for buttonListeners

    function closeModalCards(modalCards, i){
        for(let j = 0; j < modalCards.length; j++){
            if(modalCards[j].style.display === 'block'){
                modalCards[i].style.display = 'none';
            }
        }
    }

    function clickNextButton(modalCards, i){
        for(let j = 0; j < modalCards.length; j++){
            if(modalCards[j].style.display === 'block'){
                modalCards[i].style.display = 'none';
                if(i < modalCards.length -1){
                    modalCards[i + 1].style.display = 'block';
                } else {
                    modalCards[0].style.display = 'block';
                }
            }
        }
    }

    function clickPrevButton(modalCards, i){
        for(let j = 0; j < modalCards.length; j++){
            if(modalCards[j].style.display === 'block'){
                modalCards[i].style.display = 'none';
                if(i > 0){
                    modalCards[i - 1].style.display = 'block';
                } else {
                    modalCards[modalCards.length - 1].style.display = 'block';
                }
            }
        }
    }
}//end of create buttonListeners()





