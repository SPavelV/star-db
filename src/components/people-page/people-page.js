import React, {Component} from 'react'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import SwapiService from '../../services/swapi-service'

import './people-page.css'
import ErrorIndicator from '../error-indicator';

export default class PeoplePage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedPerson: 4,
    hasError: false
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch(error, info){
    this.setState({ hasError: true })
  }

  render() {

    if(this.state.hasError) {
      return <ErrorIndicator/>
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList 
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}/>
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
    
      )
  }
}