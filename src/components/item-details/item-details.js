import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import './item-details.css'
import ErrorButton from '../error-button'
import { resolvePtr } from 'dns';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field}</span>
    </li>
  )
}
export {Record}

export default class ItemDetails extends Component {

  swapiService = new SwapiService()

  state = {
    item:null,
    image: null,
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
    const {getImageUrl } = this.props;
    this.setState({ 
      item,
      image: getImageUrl(item),
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    console.log('---error:',err);
    this.setState({
      error: true,
      loading: false
    })
  }

  updateItem(){
    const { itemId, getData } = this.props;
    if(!itemId) {
      return;
    }

    this.setState({
      loading: true
    })
    
    getData(itemId)
        .then(this.onItemLoaded)
        .catch(this.onError)
  } 

  render() {
    const {item, loading, error,image} = this.state

    const hasData = !(loading || error)
    
    const errorMessage = error ?  <ErrorIndicator/> : null
    const spinner = loading ? <Spinner/> : null
    const content = hasData ? <ItemView item ={item} image={image} childRen={this.props.children}/> : null
    
    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    ) 
  }
}

const ItemView = ({item, image, childRen}) => {
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
      src={image}/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(childRen, (child,idx) => {
              return <li>{idx}</li>;
            })
          }
        </ul>
      </div>
    </React.Fragment>
  )
}
