import React, { useState } from "react";
import './Weather.css'; 
import axios from "axios"; 
interface WeatherData {
    name?: string;
    main?: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather?: { main: string }[];
    wind?: {
        speed: number;
    };
}
const Weather = () => {
    const [data, setData] = useState<WeatherData>({});
    const [location,setLocation]=useState('');
     const SearchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
        axios.get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }
};
    return (
        <div className="app">
            <div className="search">
                <input type="text" value={location}
                onChange={event=>setLocation(event.target.value)}
                placeholder="Enter location"
                onKeyDown={SearchLocation}
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main?<h1>{data.main.temp.toFixed()}°F</h1>:null}
                    </div>
                    <div className="description">
                        {data.weather?<p>{data.weather[0].main}</p>:null}
                    </div>
                </div>
                {data.name !==undefined &&
                <div className="bottom">
                    <div className="feels">
                        {data.main?<p className="bold">{data.main.feels_like.toFixed()}°F</p>:null}
                        <p>Feels like</p>
                    </div>
                    <div className="humidity">
                        {data.main?<p className="bold">{data.main.humidity}%</p>:null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind?<p className="bold">{data.wind.speed.toFixed()}MPH</p>:null}
                        <p>Wind Speed</p>
                    </div>
                </div>}
                
            </div>
        </div>
    );
};
export default Weather;