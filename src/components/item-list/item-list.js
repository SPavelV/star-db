import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import './item-list.css';
import {withData} from '../hoc-helper'

const ItemList = ({data, onItemSelected, children: renderLabel }) => {

  const renderItems = (arr) => {
    return arr.map((item) => {
      const {id} = item;
      const label = renderLabel(item)

      return (
        <li className="list-group-item"
            key={id}
            onClick = {() => onItemSelected(id)}
            >
          {label}
        </li>
      )
    })
  }

  const items = renderItems(data)

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  )
  
}

const { getAllPeople } = new SwapiService();

export default withData(ItemList,getAllPeople)

