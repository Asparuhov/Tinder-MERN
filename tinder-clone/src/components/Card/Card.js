import React,{useState} from 'react'
import './Card.css';
import TinderCard from 'react-tinder-card';
import chrisPhoto from '../../assets/Chris.jpg';
import daniPhoto from '../../assets/Dani.jpg';
import radiPhoto from '../../assets/Radi.jpg'
function Card() {
    const [people,setPeople] = useState([
      {name: 'Chris', imageUrl: chrisPhoto},
      {name: 'Dani', imageUrl: daniPhoto},
      {name: 'Radi', imageUrl: radiPhoto}
    ])
    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
      }
      
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }

    return (
        <div className='CardDiv'>
        <TinderCard 
        onSwipe={onSwipe} 
        onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
        preventSwipe={['right', 'left']}>
          <img className='card_image' src={people[0].imageUrl} alt=''/>
          </TinderCard>
        </div>
    )
}

export default Card
