import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/'
import './item-list.css';

export default class ItemList extends Component {
  
  swapiService = new SwapiService()

  state = {
    peopleList: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    const {getData} = this.props
    getData()
      .then(this.onPeopleListLoaded)
     
  }

  onPeopleListLoaded = (peopleList) => {
    this.setState({
      peopleList
    })
  }

  renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;
      const label = this.props.children(item)

      return (
        <li className="list-group-item"
            key={id}
            onClick = {() => this.props.onItemSelected(id)}
            >
          {label}
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
