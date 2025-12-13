import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

  const cardsRef = useRef(null);

  const handWheel =(event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;

  }



  useEffect(()=>{
    const node = cardsRef.current;
    if (!node) return;
    node.addEventListener('wheel', handWheel);
    return () => {
      node.removeEventListener('wheel', handWheel);
    };
  }, [])


  return (
    <div className='TitleCards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {cards_data.map((card, index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
