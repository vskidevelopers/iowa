import React, { useState, useEffect } from "react";

function TimeDivider() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const [temperature, setTemperature] = useState("");
  const [weatherDescription, SetWeatherDescription] = useState("");
  const [currentHour, setCurrentHour] = useState(hours);
  const [currentMinutes, setCurrentMinutes] = useState(minutes);
  const [currentAmpm, setCurrentAmpm] = useState(ampm);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    console.log("Api key >>", apiKey);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA >> ", data);
        console.log("Weather Description >> ", data.weather[0].description);
        setTemperature(`${Math.round(data.main.temp)}°C`);
        SetWeatherDescription(data.weather[0].description);
      })
      .catch((error) => console.log(error));

    const intervalId = setInterval(() => {
      setCurrentHour(hours);
      setCurrentMinutes(minutes);
      setCurrentAmpm(ampm);
    }, 60000); // update every minute

    return () => clearInterval(intervalId);
  });

  // const time = `${hours}:${minutes}:${ampm}`;

  // return time;

  return (
    <div className=" bg-rose-50 md:py-32 md:px-36 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Date */}
      <div className="flex flex-col items-center border-r-0 border-b-2 md:border-r-2 md:border-b-0 border-gray-500 text-center  pb-10">
        <h2 className="font-serif text-8xl text-gray-300 md:mb-10">{day}</h2>
        <p className="font-mono text-2xl font-medium text-emerald-700">
          {month}, {year}
        </p>
      </div>
      {/*  Current Time*/}
      <div className="flex flex-col items-center border-r-0 border-b-2 md:border-r-2 md:border-b-0 border-gray-500 text-center  pb-10">
        <div className="w-3/5 flex justify-end">
          <p>{currentAmpm}</p>
        </div>
        <h2 className="font-serif text-8xl text-gray-300 md:mb-10">
          {currentHour}:{currentMinutes}
        </h2>
        <p className="font-mono text-2xl font-medium text-emerald-600">
          current time{" "}
        </p>
      </div>
      {/* Weather */}
      <div className="flex flex-col items-center text-center py-5">
        <h2 className="font-serif text-8xl text-gray-300 md:mb-10">
          {temperature}
        </h2>
        <p className="font-mono text-xl font-medium text-emerald-700">
          {weatherDescription}
        </p>
      </div>
    </div>
  );
}

export default TimeDivider;
