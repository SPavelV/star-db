import React, {Component} from 'react'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import SwapiService from '../../services/swapi-service'

import './people-page.css'
import ErrorIndicator from '../error-indicator';

const Row = ({left, right}) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  )
}

class ErrorBoundry extends Component{
  
  state = {
    hasError: false
  }

  componentDidCatch(){
    this.setState({ 
      hasError: true 
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>
    }
    return this.props.children
  }

}

export default class PeoplePage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedPerson: 4,
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  render() {

    const itemList = (
        <ItemList 
          onItemSelected={this.onPersonSelected}
          getData={this.swapiService.getAllPeople}>
            {(i) => (
                `${i.name} (${i.birthYear})`
            )}
        </ItemList>
    )

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson}/>
      </ErrorBoundry>
    )

    return (
        <Row left={itemList} right={personDetails}/>
      )
  }
}