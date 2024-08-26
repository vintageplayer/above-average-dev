import React, { useEffect, useState } from "react";
import "../assets/tailwind.css";
import { getUserContributions } from "../assets/github";


const Popup = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [data, setData] = useState(null);

  const fetchUserData = async (username: string) => {
    const data = await getUserContributions(username);
    setData(data);
  }
  useEffect(() => {
    fetchUserData("vintageplayer");
  }, []);

  useEffect(() => {
      setInterval(() => {
          setTime(new Date().toLocaleTimeString());
      }, 1000);
  }, [time]);

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center text-center bg-slate-200 text-5xl'>
          {time}
          {data && JSON.stringify(data)}
      </div>
    </>
  );
};

export default Popup;