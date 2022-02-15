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
            birthday : `${person.dob.date.substring(5,7)}/${person.dob.date.substring(8,10)}/${person.dob.date.substring(0,4)}`
        };
        employees.push(personData);
        
    }
    return employees;
}

function createEmployeeCards(data){
    const employees = getPersonData(data);
    
    for(let i = 0; i < employees.length; i++){
        console.log(employees[i].gender);
    }

    const gallery = document.getElementById('gallery');

}

