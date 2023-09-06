import React, { useState ,useEffect} from "react";
import {Container,Table,Row,Col,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Myfile.css';


const Tempapp = ()=>{

    const [city,setCity]=useState(null);
    const [search,setSearch]=useState("mumbai");

    useEffect(()=>{
        const fetchApi = async ()=>{
            
           //const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6fc1495768f7deb5b55d792cfead90f1`;
            const url=`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=6fc1495768f7deb5b55d792cfead90f1`;
            const response= await fetch(url);
            const resJson=await response.json();
           // console.log(resJson);
           //setCity(resJson.main);
           if (resJson.cod === "200") 
           {
            //setCity(resJson);
            const dailyForecast = resJson.list.filter((item, index) => {
                const date = new Date(item.dt_txt);
                return index === 0 || date.getHours() === 12; // Keep only noon forecasts
              });
      
              // Update the state with the filtered data
              setCity({ ...resJson, list: dailyForecast });
          } 
          else {
            setCity(null);
          }
        };

        fetchApi();
    },[search]);

    return(
        <>
<div className="title">
    <h1 align="center">Weather Application</h1><br/>
        <div align="center">
            <h3>Search Your city :<input type="text" 
            value={search}
            onChange={(event)=>{setSearch(event.target.value)
            }}></input></h3>
            
        </div>
   {!city ? (<p className="error" align="center">No data found</p>):(
    
    <div className="my">
        <br/>
        <h2 align="center">{search}</h2>
        <br/>
        <div className="row">
        {city.list.map((forecast,index)=>
        (
        <div key={index} className="col-md-2 mb-4">
            <div className="custom-card">
            <div className="card">
            <h2 className="card.title">{forecast.dt_txt}</h2><hr/>
            <div className="card.body">
            <p><h3 className="card.text">{forecast.weather[0].description}</h3>
            <h3>{forecast.main.temp}°Cel</h3>
            <h3>Min: {forecast.main.temp_min} °Cel <br/> Max : {forecast.main.temp_max} °Cel</h3>
            <h3>Pressure :{forecast.main.pressure}</h3>
            <h3>Humidity :{forecast.main.humidity}</h3></p>
        </div>
        </div>
        </div>
        </div>
        ))}
    </div>
    </div>
    
    )
    }
    
    
</div>
        </>
    );

}
export default Tempapp;
