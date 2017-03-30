import React, { Component } from 'react';
import FormElement from '../components/FormElement';
import Entity from '../classes/entity';
import EntityList from '../components/EntityList';

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
      turnIndicator:0
    }
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let targetName = e.target.name;
    let newValue = e.target.value;
    this.setState({[targetName]: newValue});
  }

  addEntity() {
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
    return (
      <div>
        <div>
          <FormElement type="text" name="entityName" value={this.state.entityName} title="Name" handler={this.handleChange}/>
          <FormElement type="text" name="entityRace" value={this.state.entityRace} title="Race" handler={this.handleChange}/>
          <FormElement type="text" name="entityClass" value={this.state.entityClass} title="Class" handler={this.handleChange}/>
          <FormElement type="number" name="entityInitiative" value={this.state.entityInitiative} title="Initiative" handler={this.handleChange}/>
          <button onClick={() => this.addEntity()}>Add Entity</button>
        </div>
        <EntityList entities={this.state.entities}/>
      </div>
    );
  }
}

export default InitiativeApp;
