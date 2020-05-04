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
        const pixaby_api_search = {
            search_term: data_helper(response, 'adminName1', "postalCodes" )
        }
        const data = {
            lat: data_helper(response, "lat", "postalCodes"),
            long: data_helper(response, "lng", "postalCodes"),
            startDate: trip_date.value.toString().slice(5),
            endDate: trip_end_date.value.toString().slice(5)
        }
        get_weather_data(data);
        get_pixaby_pics_data(pixaby_api_search);

    }catch (e) {
        console.log(e)
    }

}


const data_helper = (api_data, obj, searchObj)=>{
    const data =[]
    for (locations of api_data[searchObj]){
        data.push(locations[`${obj}`])
    }
    return data
}

const get_weather_data = async ({lat, long, startDate, endDate})=>{
    const data_from_weatherApi=[]

    for(let i = 0; i < lat.length; i++){
        let response = await fetchData(`https://api.weatherbit.io/v2.0/normals?lat=${lat[i]}&lon=${long[i]}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=332c0e588bbf45e18694f69fb2b93a31`)
        try{
            data_from_weatherApi.push(response)
        }catch(e){
            console.log(e)
        }

    }
    console.log(data_from_weatherApi)
}


const get_pixaby_pics_data = async ({search_term})=>{
    const pixaby_data = []
    const pixaby_api_keys = '15462638-215073a9b6c18a51dd1c58089'
    for(let i = 0; i < search_term.length; i++){
        let response = await fetchData("https://pixabay.com/api/?key=15462638-215073a9b6c18a51dd1c58089&q="+search_term[i]+"&image_type=photo")
        try{
            pixaby_data.push(response)
        }catch (e) {
            console.log(e)
        }
    }
    console.log(pixaby_data)
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




