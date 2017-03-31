import React, { Component } from 'react';
import Entity from '../classes/entity';
import InitiativeDisplay from '../components/InitiativeDisplay';

class InitiativeApp extends Component {

  constructor() {
    super();
    let test = new Entity(12);
    this.state = {
      entities: [],
      delayedEntities: [],
      entityName: "",
      entityRace: "",
      entityClass: "",
      entityInitiative: 0,
      turnIndicator: 0,
      movingItem: null
    };
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e) {
    // Grab the li element
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    this.setState({movingItem: e.target});
  }

  drop(e) {
    e.preventDefault();
    // let parser = new DOMParser();
    // let movingEntity = e.dataTransfer.getData("text/html");
    // console.log(movingEntity);
    // movingEntity = parser.parseFromString(movingEntity, "text/html")
    // movingEntity = movingEntity.body.firstChild;
    // console.log(movingEntity);
    console.log(e.target);
    console.log(e.target.parentElement);
    e.target.parentElement.insertBefore(this.state.movingItem, e.target);

    this.setState({movingItem: null});
  }

  handleChange(e) {
    let targetName = e.target.name;
    let newValue = e.target.value;
    this.setState({[targetName]: newValue});
  }

  addEntity(e) {
    e.preventDefault();
    let newEntity = new Entity(this.state.entityInitiative,this.state.entityName, this.state.entityRace, this.state.entityClass);
    let entities = this.state.entities.slice();
    if ( entities.length == 0 ) {
      entities.push(newEntity);
    } else {
        for(let i = 0; i < entities.length; i++) {
            if( newEntity.initiative > entities[i].initiative || i == entities.length-1) {
                entities.splice(i, 0, newEntity);
                i = entities.length;
            }
        }
    }
    this.setState({entities: entities,
      entityName: "",
      entityRace: "",
      entityClass: "",
      entityInitiative: 0});
  }

  render() {
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} drop={this.drop}/>;
  }
}

export default InitiativeApp;
