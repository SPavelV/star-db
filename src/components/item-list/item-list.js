import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/'
import './item-list.css';

export default class ItemList extends Component {
  
  swapiService = new SwapiService()

  state = {
    peopleList: null,
    lading: true,
    error: false
  }

  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then(this.onPeopleListLoaded)
      // .catch(this.onError)
      
  }

  onPeopleListLoaded = (peopleList) => {
    this.setState({
      peopleList,
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

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            >
          {name}
        </li>
      )
    })
  }

  render() {
    const { peopleList } = this.state;

    if(!peopleList) {
      return <Spinner/>
    }

    const items = this.renderItems(peopleList)

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    )
  }
}
