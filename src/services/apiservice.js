import axios from "axios"



const getAllCountries = async()=> {
    return await axios.get('https://restcountries.com/v3.1/all')

}


export{
    getAllCountries
}