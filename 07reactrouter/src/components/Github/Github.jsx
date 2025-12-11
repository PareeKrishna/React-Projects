import React from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
    const data = useLoaderData();
    // const [data, setData] = React.useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/PareeKrishna')
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data)
    //             console.log(data);
    //         })
    // }, []);
  return (
    <div className='bg-gray-600 m-4 text-white text-3xl text-center py-7'>
      Github Page
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/PareeKrishna');

    return response.json();
}