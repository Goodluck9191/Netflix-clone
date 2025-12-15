import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'




const TitleCards = ({title, category}) => {
  const image_base_url = "https://image.tmdb.org/t/p/w500";
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = " eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzYzOWNiZmNlZWZmY2U2NGUwYzcyNGFkZTY0OTI0MCIsIm5iZiI6MTc1NjIyNDIyMC4xODU5OTk5LCJzdWIiOiI2OGFkZGFkY2M2ZGYwZmViMWE2Y2VmYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.m0xRG2p1Ls63UgbjuRB3idqLslDaHJZrctdUgAMFvQ8"
 
  const [apiData, setApiData] = React.useState([]);
  const [error, setError] = React.useState(null);

  const cardsRef = useRef(null);

  const handWheel =(event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;

  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer${API_KEY}`
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApiData(data.results);

    } catch (error) {
      console.log('Fetch error: ', error);
      setError(error);
    }
    
  }





  useEffect(()=>{

    fetchData();
    cardsRef.current.addEventListener('wheel', handWheel);

  }, [])
  


  return (
    <div className='TitleCards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={image_base_url+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
