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
      turnIndicator: 0
    };
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.generateUUID = this.generateUUID.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  hoverIn(e) {
    e.preventDefault();
    // console.log("hover in");
    // let movingEntity = e.dataTransfer.getData("text");
    // console.log("movingentity", movingEntity);
    // movingEntity = document.getElementById(movingEntity);
    // movingEntity.classList.add("opaque");
    // if(e.target.id == "entities" || e.target.id == "delayed") {
    //   e.target.insertBefore(movingEntity, null);
    // } else {
    //   e.target.parentElement.insertBefore(movingEntity, e.target);
    // }
  }

  hoverOut(e) {
    e.preventDefault();
    // console.log("hover out");
    // let movingEntity = e.dataTransfer.getData("text");
    // movingEntity = document.getElementById(movingEntity);
    // if(e.target.id == "entities" || e.target.id == "delayed") {
    //   e.target.removeChild(movingEntity);
    // } else {
    //   e.target.parentElement.removeChild(movingEntity);
    // }
  }

  generateUUID(a, b){
    for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
    return b;
  } 

  drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  drop(e) {
    e.preventDefault();
    let movingEntity = e.dataTransfer.getData("text");
    movingEntity = document.getElementById(movingEntity);
    console.log(e.target);
    if(e.target.id == "entities" || e.target.id == "delayed") {
      e.target.insertBefore(movingEntity, null);
    } else {
      e.target.parentElement.insertBefore(movingEntity, e.target);
    }
  }

  handleChange(e) {
    let targetName = e.target.name;
    let newValue = e.target.value;
    this.setState({[targetName]: newValue});
  }

  addEntity(e) {
    e.preventDefault();
    let newId = this.generateUUID();
    let newEntity = new Entity(newId, this.state.entityInitiative,this.state.entityName, this.state.entityRace, this.state.entityClass);
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
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} drop={this.drop} hoverOut={this.hoverOut} hoverIn={this.hoverIn}/>;
  }
}

export default InitiativeApp;
