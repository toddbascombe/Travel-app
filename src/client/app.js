//current date and time
const date = new Date()
const submitBtn = document.querySelector("#submit");
const locationValue = document.querySelector("#location")
const trip_date = document.querySelector("#trip_date")
const trip_end_date = document.querySelector("#trip_date_end")
//import {fetchData} from './js/FetchData'

/**
 * this function runs when the button is clicked
 * @param event
 * @returns {Promise<void>}
 */
const submit_User_Data = async (event)=> {
    event.preventDefault();
    const response = await fetchData("http://api.geonames.org/postalCodeSearchJSON?placename="+locationValue.value+"&maxRows=10&username="+"valkoor96")
    try{
        const data = {
            lat: data_helper(response, "lat"),
            long: data_helper(response, "lng"),
            startDate: trip_date.value.toString().slice(5),
            endDate: trip_end_date.value.toString().slice(5)
        }
        get_weather_data(data);
    }catch (e) {
        console.log(e)
    }
}


const data_helper = (api_data, obj)=>{
    const data =[]
    for (locations of api_data['postalCodes']){
        data.push(locations[`${obj}`])
    }
    return data
}

const get_weather_data = async ({lat, long, startDate, endDate})=>{
    const data_from_weatherApi=[]

    for(let i = 0; i < lat.length; i++){
        let response = await fetchData(`https://api.weatherbit.io/v2.0/normals?lat=${lat[i]}&lon=
            ${long[i]}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=332c0e588bbf45e18694f69fb2b93a31`)
        try{
            data_from_weatherApi.push(response)
        }catch(e){
            console.log(e)
        }

    }
    console.log(data_from_weatherApi)
}




/**
 * This helper function fetch data from any api endpoint
 * @param url
 * @returns {Promise<any>}
 */
const fetchData = (url)=>{
    return fetch(url)
        .then((value) => value.json())
        .then(value1 => {
            return value1
        })
        .catch(err => {
            return (err)
        });
}


//listens for a click event on the submit button
submitBtn.addEventListener('click', submit_User_Data)




