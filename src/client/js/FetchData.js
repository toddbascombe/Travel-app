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


export {fetchData}