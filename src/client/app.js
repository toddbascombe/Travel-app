//current date and time


const date = new Date()
const submitBtn = document.querySelector("#submit");
const locationValue = document.querySelector("#location")
const trip_date = document.querySelector("#trip_date")



const submit_User_Data = (event)=>{
    event.preventDefault();
    fetch(`http://api.geonames.org/postalCodeSearch?placename=${locationValue.value}&maxRows=10&username='valkoor96'`, {
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((value)=>{console.log(value.json())})

}



const fetchData = (url)=>{
    fetch(url)
        .then((response)=> {return response})
        .catch(err=> {return err})
}


submitBtn.addEventListener('click', submit_User_Data)




