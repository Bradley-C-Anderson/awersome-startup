function fetchData(url){
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            //.then (res => res.json())
            .catch(error => console.log('Looks like a problem', error))
}

function checkStatus(response) {
    if(response.ok){
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

fetchData('https://randomuser.me/api/?nat=us&results=12')
    .then(data => createEmployeeCards(data.results))
    

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
            picture : person.picture.large
        };
        employees.push(personData);
        
    }
    return employees;
}


function createEmployeeCards(data){
    const employees = getPersonData(data);
    const gallery = document.getElementById('gallery');
    let html = '';
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
    }
    gallery.insertAdjacentHTML('beforeend', html);
}

