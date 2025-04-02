
let key = '5ee77341b7947f50204baaf717ca936b';

let getData = async(city) => {
    // let {lat, lon} = getCoor(city);
    let url = `https://api.openweathermap.org/data/2.5/weather`
    let data = await fetch(`${url}?q=${city}&appid=${key}&units=metric`);
    let jsonData = await data.json();
    console.log(jsonData);
    return jsonData;
    
}
export {getData};
