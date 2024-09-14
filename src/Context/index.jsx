import { useContext, createContext, useState, useEffect } from "react";

import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather,  setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Jaunpur')
    const [thisLocation, setLocation] = useState('')

    //fetch api

    const fetchWeather = async() => {
        const options ={
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnName: 0,
            },

            headers: {
                'X-RapidAPI-Key': "9c508ad36emshbdbf94353d29a92p1b0434jsn32f9e2fe2d19",
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try{
            const response = await axios.request(options);
            console.log(response.data) 
            

            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWeather(thisData.values[0])

        }catch(e) {
            console.error(e);

            // if the api throws error...

            alert('This place does not exist')
        }
    }

    useEffect(() => {
        fetchWeather()
    },[place])

    useEffect(() => {
        console.log(values)
    },[values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
       
        }}>
            {children}
        </StateContext.Provider>    
    )
}

export const useStateContext = () => useContext(StateContext)