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

fetchData('https://randomuser.me/api/?nat=us')
    .then(data => getPersonData(data))

function getPersonData(data){
    const person = data.results[0];
    const firstName = person.name.first;
    const lastName = person.name.last;
    const email = person.email;
    const streetNumber = person.location.street.number;
    const streetName = person.location.street.name;
    const city = person.location.city;
    const state = person.location.state;
    const zip = person.location.postcode;
    const birthday = `${person.dob.date.substring(5,7)}/${person.dob.date.substring(8,10)}/${person.dob.date.substring(0,4)}`
    console.log(person.dob.date.substring(0,4));
}