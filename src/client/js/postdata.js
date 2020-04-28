/**
 *
 * @param url - server endpoint
 * @param data - data to sumbit to the server
 * @returns {Promise<void>}
 */


const postData = async (url, data={}) =>{
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: "default",
        credentials: "same-origin",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        console.log(response.json())
    }catch (e) {
        console.error(e)
    }
}

export default postData