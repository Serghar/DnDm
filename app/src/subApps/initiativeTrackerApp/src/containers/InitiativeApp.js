import React, { Component } from 'react';
import Entity from '../classes/entity';
import InitiativeDisplay from '../components/InitiativeDisplay';

class InitiativeApp extends Component {

  constructor() {
    super();
    let entityHeader = new Entity("entities", Number.MAX_SAFE_INTEGER, null, null, null);
    let delayedHeader = new Entity("delayed", Number.MAX_SAFE_INTEGER, null, null, null);
    this.state = {
      entities: [entityHeader],
      delayedEntities: [delayedHeader],
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
    console.log("drag into", e.target.id);
    e.preventDefault();
    let movingEntity = this.state.movingEntity;
    if( e.target.id != movingEntity.id){
      this.removeEntity(movingEntity.id);
      this.insertEntity(e.target.id, movingEntity);
    }
  }

  // When dragged element is dropped, remove the preview ghost and modify the entity
  // list in state to finalize the move
  drop = (e) => {
    console.log("drop");
    e.preventDefault();
    let targetId = e.target.id;
    console.log(this.state.movingEntity.id,"dropped over:", targetId);

    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
    if( targetId != movingEntity.id){
      this.removeEntity(movingEntity.id);
      this.insertEntity(targetId, movingEntity);
    }    
  }

  insertEntity = (targetID, entityToInsert) => {
    let entitiesCopy = this.state.entities.slice();
    let delayedEntitiesCopy = this.state.delayedEntities.slice();
    for( let i = 0; i < entitiesCopy.length; i++ ){
      if( entitiesCopy[i].id == targetID ){
        entitiesCopy.splice(i+1, 0, entityToInsert);
        console.log("Re-added entity to entities:", entityToInsert);
        this.setState({entities: entitiesCopy});
        return;
      }
    }
    for( let i = 0; i < delayedEntitiesCopy.length; i++ ){
      if( delayedEntitiesCopy[i].id == targetID ){
        delayedEntitiesCopy.splice(i+1, 0, entityToInsert);
        console.log("Re-added entity to delayedEntities:", entityToInsert);
        this.setState({delayedEntities: delayedEntitiesCopy});
        return;
      }
    }
    console.log("Error, target not found");
    return;
  }


  // When the element is dragged, store its info in state
  drag = (e, entity) => {
    console.log("dragging", e.target.id);
    let movingEntity = document.getElementById(entity.id);
    entity.moving = true;
    this.setState({movingEntity: entity});
  }

  // When a drag ends, change the entity's moving status and reset movingEntity in state
  dragEnd = (e, targetId) => {
    e.preventDefault();
    console.log("drag ending on", targetId);
    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
    console.log("The entity moving was:",this.state.movingEntity);
    this.setState({movingEntity: null});
  }

  // Update state when user enters data into an input field
  handleChange = (e) => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    if ( targetName == "entityInitiative" ) {
      targetValue = parseInt(targetValue);
    }
    this.setState({[targetName]: targetValue});
  }

  // Create a new entity based on the information stored in state
  addEntity = (e) => {
    e.preventDefault();
    let newId = this.generateUUID();
    let newEntity = new Entity(newId, this.state.entityInitiative, this.state.entityName, this.state.entityRace, this.state.entityClass);
    let entities = this.state.entities.slice();
    let finalIndex = entities.length-1;
    // if ( entities.length == 0 ) {
    //   entities.push(newEntity);
    // } else {
        for ( let i = 0; i <= finalIndex; i++ ) {
            if ( newEntity.initiative > entities[i].initiative) {
                console.log(newEntity.initiative, "greater than", entities[i].initiative);
                entities.splice(i, 0, newEntity);
                console.log(entities);
                i = entities.length;
            } else if ( i == finalIndex ) {
                console.log(newEntity.initiative, "is the new lowest init");
                entities.push(newEntity);
                console.log(entities);
            }
        }
    // }
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
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} dragIn={this.dragIn} drop={this.drop} dragEnd={this.dragEnd}/>;
  }
}

export default InitiativeApp;
