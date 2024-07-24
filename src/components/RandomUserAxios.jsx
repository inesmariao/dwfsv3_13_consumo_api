import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const RandomUserAxios = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const axiosData = async () => {
      try {
        
        const response = await axios.get("https://api.randomuser.me/");

        const data = response.data;

        const userData = {
          name: data.results[0].name.first,
          last_name: data.results[0].name.last,
          city: data.results[0].location.city,
          country: data.results[0].location.country,
          email: data.results[0].email,
          picture: data.results[0].picture.large,
          cell: data.results[0].cell
        };

        setUser(userData);

      } catch (error) {
        console.error("Error al consultar los datos de la API: ", error);
      }
    };

    axiosData();

    const intervalId = setInterval(axiosData, 2000);

    return () => clearInterval(intervalId);

  }, []);


  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
        {user ? (
          <div>
            <div className='card text-center'>
              <div className='card-header py-2'>
                <img src={user.picture} className='img-fluid rounded-circle' alt="profile"/>
              </div>
              <div className='card-body'>
                <h4 className='card-title'>{user.name}</h4>
                <p>Email: {user.email}</p>
                <p>Phone: {user.cell}</p>
                <p>City: {user.city}, Country: {user.country}</p>
              </div>
            </div>
          </div>
    ) : null }
    </div>
  )
}
