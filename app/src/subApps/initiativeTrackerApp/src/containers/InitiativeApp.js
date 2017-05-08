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
      movingEntity: null,
      tracker: null
    };
    this.setState = this.setState.bind(this);
  }

  // Generates practically unique IDs for identifying entities
  generateUUID = (a, b) => {
    for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
    return b;
  }

  // Allow entities to be dropped over the current DOM element
  allowDrop = (e) => {
    e.preventDefault();
  }

  // When an entity is dragged over current DOM element, display a preview ghost of
  // where it will go if released
  dragIn = (e) => {
    // console.log("dragin");
    e.preventDefault();
    let movingEntity = this.state.movingEntity;
    // let movingEntity = document.getElementById(movingEntity.id);
    if(e.target.id == "entities" || e.target.id == "delayed") {
      // e.target.insertBefore(movingEntity, null);
    } else {
      // e.target.parentElement.insertBefore(movingEntity, e.target.nextSibling);
      if( e.target.id != movingEntity.id){
        this.removeEntity(movingEntity.id);
        this.insertEntity(e.target.id, movingEntity);
      }
    }
  }

  // When element is dragged away, remove the preview ghost
  dragOut = (e) => {
    console.log("dragout");
    e.preventDefault();
    // let movingEntity = document.getElementById(this.state.movingEntity.id);
    // if(e.target.id == "entities" || e.target.id == "delayed") {
    //   e.target.removeChild(movingEntity);
    // } else {
    //   e.target.parentElement.removeChild(movingEntity);
    // }
  }

  // When dragged element is dropped, remove the preview ghost and modify the entity
  // list in state to finalize the move
  drop = (e) => {
    console.log("drop");
    e.preventDefault();
    console.log(this.state.movingEntity.id,"dropped over:", e.target.id);

    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
    if( e.target.id != movingEntity.id){
      this.removeEntity(movingEntity.id);
      this.insertEntity(e.target.id, movingEntity);
    }
    // let movedEntity = document.getElementById(this.state.movingEntity.id);
    // movedEntity.classList.remove("opaque");
    // console.log("removed", removed);
    // if(e.target.id != this.state.movingEntity.id){
    //   let removed = this.removeEntity(this.state.movingEntity.id);
    //   // TODO: figure out some way to combine these if check sets
    //   if(e.target.id == "entities") {
    //     console.log("moved to empty entities");
    //     let entitiesCopy = this.state.entities.slice();
    //     entitiesCopy.splice(0, 0, removed);
    //     this.setState({entities: entitiesCopy});
    //   } else if(e.target.parentElement.id == "entities") {
    //     console.log("moved to entities, target: ", e.target.id);
    //     let entitiesCopy = this.state.entities.slice();
    //     console.log("entities before readding: ", entitiesCopy);
    //     for(let i = 0; i < entitiesCopy.length; i++) {
    //       if(e.target.id == entitiesCopy[i].id) {
    //         entitiesCopy.splice(i+1, 0, removed);
    //         this.setState({entities: entitiesCopy});
    //         i = entitiesCopy.length;
    //       }
    //     }
    //   }else if(e.target.id == "delayed") {
    //     console.log("moved to empty delayed");
    //     let delayedEntities = this.state.delayedEntities.slice();
    //     delayedEntities.splice(0, 0, removed);
    //     this.setState({delayedEntities: delayedEntities});
    //   } else if(e.target.parentElement.id == "delayed") {
    //     console.log("moved to delayed, target: ", e.target.id);
    //     let delayedEntities = this.state.delayedEntities.slice();
    //     for(let i = 0; i < delayedEntities.length; i++) {
    //       if(e.target.id == delayedEntities[i].id) {
    //         delayedEntities.splice(i+1, 0, removed);
    //         this.setState({delayedEntities: delayedEntities});
    //         i = delayedEntities.length;
    //       }
    //     }
    //   }
    // }
    console.log("The entity moving was:",this.state.movingEntity);
    this.setState({movingEntity: null});
  }

  insertEntity = (targetID, entityToInsert) => {
    let entitiesCopy = this.state.entities.slice();
    let delayedEntitiesCopy = this.state.delayedEntities.slice();
    for( let i = 0; i < entitiesCopy.length; i++ ){
      if( entitiesCopy[i].id == targetID ){
        entitiesCopy.splice(i+1, 0, entityToInsert);
        console.log("Re-added entity:", entityToInsert);
        this.setState({entities: entitiesCopy});
        return;
      }
    }
    for( let i = 0; i < delayedEntitiesCopy.length; i++ ){
      if( delayedEntitiesCopy[i].id == targetID ){
        delayedEntitiesCopy.splice(i+1, 0, entityToInsert);
        this.setState({delayedEntities: delayedEntitiesCopy});
        return;
      }
    }
    return "Error, target not found";
  }


  // When the element is dragged, store its info in state and convert it
  // into a preview ghost 
  drag = (e, entity) => {
    console.log("dragging", e.target.id);
    let movingEntity = document.getElementById(entity.id);
    entity.moving = true;
    // movingEntity.classList.add("opaque");
    this.setState({movingEntity: entity});
  }

  dragEnd = (e, targetId) => {
    e.preventDefault();
    console.log("drag ending on", targetId);
    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
    
    // e.target.parentElement.removeChild(e.target);
  }

  // Update state when user enters data into an input field
  handleChange = (e) => {
    let targetName = e.target.name;
    this.setState({[targetName]: e.target.value});
  }

  // Create a new entity based on the information stored in state
  addEntity = (e) => {
    e.preventDefault();
    // console.log("add entity");
    let newId = this.generateUUID();
    let newEntity = new Entity(newId, this.state.entityInitiative,this.state.entityName, this.state.entityRace, this.state.entityClass);
    let entities = this.state.entities.slice();
    if ( entities.length == 0 ) {
      entities.push(newEntity);
    } else {
        for(let i = 0; i < entities.length; i++) {
            if( newEntity.initiative > entities[i].initiative || i == entities.length-1) {
                entities.splice(i+1, 0, newEntity);
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

  // Find the entity with the chosen ID and remove it from whichever list
  // contains it
  removeEntity = (removeId) => {
    let entitiesCopy = this.state.entities.slice();
    let delayedEntitiesCopy = this.state.delayedEntities.slice();

    for( let entity of entitiesCopy) {
      if( entity.id == removeId) {
        let removed = entitiesCopy.splice(entitiesCopy.indexOf(entity), 1);
        
        // console.log("entities copy: ", entitiesCopy);
        // this.setState({entities: entitiesCopy});
        this.state.entities = entitiesCopy;
        return removed[0];
      }
    }
    for( let entity of delayedEntitiesCopy) {
      if( entity.id == removeId) {
        let removed = delayedEntitiesCopy.splice(delayedEntitiesCopy.indexOf(entity), 1);
        // this.setState({delayedEntities: delayedEntitiesCopy});
        this.state.delayedEntities = delayedEntitiesCopy;
        return removed[0];
      }
    }
    return "Entity not found";
  }

  render() {
    // console.log("main render");
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} dragOut={this.dragOut} dragIn={this.dragIn} drop={this.drop} dragEnd={this.dragEnd}/>;
  }
}

export default InitiativeApp;
