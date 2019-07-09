import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import './item-details.css'
import ErrorButton from '../error-button'


export default class ItemDetails extends Component {

  swapiService = new SwapiService()

  state = {
    item:null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({ 
      item,
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateItem(){
    const { itemId } = this.props;
    if(!itemId) {
      return;
    }

    this.setState({
      loading: true
    })
    
    this.swapiService
        .getPerson(itemId)
        .then(this.onItemLoaded)
        .catch(this.onError)
  } 

  render() {
    const {item, loading, error} = this.state

    const hasData = !(loading || error)
    
    const errorMessage = error ?  <ErrorIndicator/> : null
    const spinner = loading ? <Spinner/> : null
    const content = hasData ? <ItemView item ={item}/> : null
    
    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    ) 
  }
}

const ItemView = ({item}) => {
  const {
    id,
    name,
    gender,
    birthYear,
    eyeColor,
  } = item;

  return (
    <React.Fragment>
      <img className="item-image"
      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
          <li className="list-group-item">
            <ErrorButton/>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
