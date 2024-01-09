import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import BASE_URL from "./config.js"
const Home = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await axios.post('http://localhost:8000/logout');
    if (result.data.message === 'Logout successful') {
      navigate('/login');
    }
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTljZTRlOWNlMTYyMDM1MGRlZThkMDkiLCJpYXQiOjE3MDQ3ODEwMzMsImV4cCI6MTcwNDc4NDYzM30.B6AOktp8Dj7FX6r6RwWT2IzbqQRzH4hUkhWaAerWDVQ';

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleUrlSubmit = async () => {
    const result = await axios.post(
      'http://localhost:8000/shorten',
      { url: input },
      config,
    );
    console.log(result);
    setInput('');
  };

  const handleUrlClick = async (url) => {
    console.log('clicked');
    // axios.get(url, config);
    // navigate({ url });
  };

  const fetchData = async () => {
    // const getdata = await fetch("http://127.0.0.1:8000/nJoKAKUF");
    const getdata = await axios.get('http://localhost:8000/getAll', config);
    const { data } = getdata.data;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div >
      <h1 className="font-bold text-center text-2xl border-b-2 border-gray-400 shadow-md p-2 text-orange-500">URL SHORTNER</h1>

      {data.map((object, index) => (
        <div key={index} className="w-96 h-auto m-4 border-2  p-4 overflow-auto mx-auto border-b-2 border-gray-400 shadow-md p-4 ">
        <span className="font-bold">Code:</span> {object.code}<br />
        <span className="font-bold">Visited:</span> {object.visited}<br />
        <span className="font-bold">Shortened URL:</span>{' '}
        <a
          className="text-blue-500"
          onClick={() => handleUrlClick(object.shortenedURL)}
          href={object.shortenedURL}
        >
          {object.shortenedURL}
        </a><br />
        <span className="font-bold">Original URL:</span> 
        <a
          className="text-blue-500"
          onClick={() => handleUrlClick(object.originalURL)}
          href={object.originalURL}
        >
          {object.originalURL}
        </a><br />
      </div>
      ))}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex float-end mb-4 "
        onClick={handleLogOut}>
        Log out
      </button>
      <form action="">
      <input
  className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ml-5 mx-auto"
  type="text"
  placeholder="Enter a URL"
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

        <button
          onClick={handleUrlSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit URL
        </button>
      </form>
    </div>
  );
};

export default Home;
