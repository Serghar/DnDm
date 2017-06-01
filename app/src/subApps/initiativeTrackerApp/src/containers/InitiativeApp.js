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
      turnIndicator: 1,
      movingEntity: null
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

  // When an entity is dragged over current DOM element, move it and make it opaque of
  // where it will go if released
  dragIn = (e) => {
    // console.log("drag into", e.target.id);
    e.preventDefault();
    let movingEntity = this.state.movingEntity;
    if ( e.target.id != movingEntity.id){
      let fromLocation = this.removeEntity(movingEntity.id);
      let toResult = this.insertEntity(e.target.id, movingEntity);
      let toLocation = toResult[0];
      
      console.log("from:", fromLocation, "to:", toLocation);
      if ( fromLocation == "current" && ( toLocation == "before" || toLocation == "after" ) ) {
        console.log("moving to:", toResult[1]);
        this.setState({ turnIndicator: toResult[1] });
      } else if ( fromLocation == "before" && ( toLocation == "delayed" || toLocation == "current" ) ) {
        console.log("rolling back");
        this.rollBackTurn();
      } else if ( ( fromLocation == "delayed" || fromLocation == "after" ) && ( toLocation == "before" || toLocation == "current" ) ) {
        console.log("stepping forward");
        if ( this.state.turnIndicator != this.state.entities.length-1 ){
          this.nextTurn();
        } else {
          this.setState({ turnIndicator: this.state.entities.length });
        }
      }
    }
  }

  // When dragged element is dropped, remove the "opaque" class and modify the entity
  // list in state to finalize the move
  drop = (e) => {
    // console.log("drop");
    e.preventDefault();
    let targetId = e.target.id;
    // console.log(this.state.movingEntity.id,"dropped over:", targetId);

    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
  }


  // When the element is dragged, store its info in state
  drag = (e, entity) => {
    // console.log("dragging", e.target.id);
    let movingEntity = document.getElementById(entity.id);
    entity.moving = true;
    this.setState({movingEntity: entity});
  }

  // When a drag ends, change the entity's moving status and reset movingEntity in state
  dragEnd = (e, targetId) => {
    e.preventDefault();
    // console.log("drag ending on", targetId);
    let movingEntity = this.state.movingEntity;
    movingEntity.moving = false;
    // console.log("The entity moving was:",this.state.movingEntity);
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

    if ( finalIndex == 0 ) {
      this.setState({ currentActor: newId });
    }

    for ( let i = 0; i <= finalIndex; i++ ) {
        if ( newEntity.initiative > entities[i].initiative) {
            // console.log(newEntity.initiative, "greater than", entities[i].initiative);
            entities.splice(i, 0, newEntity);
            // console.log(entities);
            i = entities.length;
        } else if ( i == finalIndex ) {
            // console.log(newEntity.initiative, "is the new lowest init");
            entities.push(newEntity);
            // console.log(entities);
        }
    }
    this.setState({entities: entities,
      entityName: "",
      entityRace: "",
      entityClass: "",
      entityInitiative: 0});
  }

  insertEntity = ( targetID, entityToInsert ) => {
    console.log("inserting: ", entityToInsert);
    let entitiesCopy = this.state.entities.slice();
    let delayedEntitiesCopy = this.state.delayedEntities.slice();
    for ( let i = 1; i <= entitiesCopy.length; i++ ){
      if ( entitiesCopy[i-1].id == targetID ){
        entitiesCopy.splice( i, 0, entityToInsert );
        // console.log("Re-added entity to entities:", entityToInsert);
        this.setState({entities: entitiesCopy});
        if ( i < this.state.turnIndicator ) {
          return ["before", i]
        } else if ( i == this.state.turnIndicator ) {
          return ["current"];
        } else {
          return ["after", i]
        }
      }
    }
    for ( let i = 1; i <= delayedEntitiesCopy.length; i++ ){
      if ( delayedEntitiesCopy[i-1].id == targetID ){
        delayedEntitiesCopy.splice(i, 0, entityToInsert);
        // console.log("Re-added entity to delayedEntities:", entityToInsert);
        this.setState({delayedEntities: delayedEntitiesCopy});
        return ["delayed"];
      }
    }
    console.log("Error, target not found");
    return;
  }

  // Find the entity with the chosen ID and remove it from whichever list
  // contains it
  removeEntity = (removeId) => {
    console.log("removing: ", removeId);
    let entitiesCopy = this.state.entities.slice();
    let delayedEntitiesCopy = this.state.delayedEntities.slice();

    for( let [idx, entity] of entitiesCopy.entries()) {
      if( entity.id == removeId) {
        let removed = entitiesCopy.splice(entitiesCopy.indexOf(entity), 1);
        // this.setState({entities: entitiesCopy});
        this.state.entities = entitiesCopy;
        if ( idx < this.state.turnIndicator ) {
          return "before";
        } else if ( idx == this.state.turnIndicator ) {
          return "current";
        } else {
          return "after";
        }
      }
    }
    for( let entity of delayedEntitiesCopy) {
      if( entity.id == removeId) {
        let removed = delayedEntitiesCopy.splice(delayedEntitiesCopy.indexOf(entity), 1);
        // this.setState({delayedEntities: delayedEntitiesCopy});
        this.state.delayedEntities = delayedEntitiesCopy;
        return "delayed";
      }
    }
    return "Entity not found";
  }

  nextTurn = () => {
    // console.log("turn forward");
    let currTurn = this.state.turnIndicator;
    if ( currTurn == this.state.entities.length-1 ) {
      currTurn = 1;
    } else {
      currTurn += 1;
    }
    this.setState({ turnIndicator: currTurn });
  }

  rollBackTurn = () => {
    // console.log("turn backward");
    let currTurn = this.state.turnIndicator;
    if ( currTurn == 1 ) {
      currTurn = this.state.entities.length-1;
    } else {
      currTurn -= 1;
    }
    this.setState({ turnIndicator: currTurn });
  }

  render() {
    // console.log("main render");
    return <InitiativeDisplay data={this.state} handleChange={this.handleChange} addEntity={this.addEntity} allowDrop={this.allowDrop} drag={this.drag} dragIn={this.dragIn} drop={this.drop} dragEnd={this.dragEnd} nextTurn={this.nextTurn} rollBackTurn={this.rollBackTurn}/>;
  }
}

export default InitiativeApp;
