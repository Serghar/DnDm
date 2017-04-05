import React, { Component } from 'react';
import Entity from '../classes/entity';
import InitiativeDisplay from '../components/InitiativeDisplay';

class InitiativeApp extends Component {

  constructor() {
    super();
    this.state = {
      entities: [],
      delayedEntities: [],
      entityName: "",
      entityRace: "",
      entityClass: "",
      entityInitiative: 0,
      turnIndicator: 0,
      movingEntityId: null
    };
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  dragIn = (e) => {
    e.preventDefault();
    console.log("dragIn");
    let movingEntity = document.getElementById(this.state.movingEntityId);
    movingEntity.classList.add("opaque");
    if(e.target.id == "entities" || e.target.id == "delayed") {
      e.target.insertBefore(movingEntity, null);
    } else {
      e.target.parentElement.insertBefore(movingEntity, e.target);
    }
  }

  dragOut = (e) => {
    e.preventDefault();
    console.log("dragOut");
    let movingEntity = document.getElementById(this.state.movingEntityId);
    if(e.target.id == "entities" || e.target.id == "delayed") {
      e.target.removeChild(movingEntity);
    } else {
      e.target.parentElement.removeChild(movingEntity);
    }
  }

  generateUUID = (a, b) => {
    for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
    return b;
  } 

  drag = (e) => {
    console.log("drag");
    // e.dataTransfer.setData("text", e.target.id);
    // console.log("data still held:", e.dataTransfer.getData("text"));
    this.setState({movingEntityId: e.target.id});
    // e.target.parentElement.removeChild(e.target);
  }

  dragEnd = (e) => {
    e.target.classList.remove("opaque");
  }

  drop = (e) => {
    e.preventDefault();
    console.log("drop");
    // let movingEntity = e.dataTransfer.getData("text");
    // movingEntity = document.getElementById(movingEntity);
    let movingEntity = document.getElementById(this.state.movingEntityId);
    movingEntity.classList.remove("opaque");
    // console.log("data still held:", e.dataTransfer.getData("text"));
    if(e.target.id == "entities" || e.target.id == "delayed") {
      e.target.insertBefore(movingEntity, null);
    } else {
      e.target.parentElement.insertBefore(movingEntity, e.target);
    }
  }

  handleChange = (e) => {
    let targetName = e.target.name;
    let newValue = e.target.value;
    this.setState({[targetName]: newValue});
  }

  addEntity = (e) => {
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
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} drop={this.drop} dragOut={this.dragOut} dragIn={this.dragIn} dragEnd={this.dragEnd}/>;
  }
}

export default InitiativeApp;
