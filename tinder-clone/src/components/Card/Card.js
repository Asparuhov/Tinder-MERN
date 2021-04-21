import React,{useState, useEffect} from 'react'
import './Card.css';
import TinderCard from 'react-tinder-card';
import chrisPhoto from '../../assets/Chris.jpg';
import daniPhoto from '../../assets/Dani.jpg';
import radiPhoto from '../../assets/Radi.jpg';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions'
function Card(props) {

    useEffect(() =>{
        props.loadUsers([
          {name: 'Chris', age: 20, imageUrl: chrisPhoto},
          {name: 'Dani',age: 25, imageUrl: daniPhoto},
          {name: 'Radi',age: 16, imageUrl: radiPhoto}
        ]);
    }, [])
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
          <img className='card_image' src={props.use} alt=''/>
          </TinderCard>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return{
    users: state.users
  }
}
const toActions = dispatch =>{
  return{
    loadUsers:(users) => dispatch(actions.loadUsers(users))
  }
}
export default connect(mapStateToProps,toActions)(Card);
