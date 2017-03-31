import React, { Component } from 'react';
import FormElement from './FormElement';
import EntityList from './EntityList';

class InitiativeDisplay extends Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="./css/InitiativeTracker.css"/>
                <div>
                    <FormElement type="text" name="entityName" value={this.props.data.entityName} title="Name" handler={this.props.handleChange}/>
                    <FormElement type="text" name="entityRace" value={this.props.data.entityRace} title="Race" handler={this.props.handleChange}/>
                    <FormElement type="text" name="entityClass" value={this.props.data.entityClass} title="Class" handler={this.props.handleChange}/>
                    <FormElement type="number" name="entityInitiative" value={this.props.data.entityInitiative} title="Initiative" handler={this.props.handleChange}/>
                    <button onClick={() => this.props.addEntity()}>Add Entity</button>
                </div>
                <div className="row">
                    <EntityList entities={this.props.data.entities} classes="six columns" drag={this.props.drag} allowDrop={this.props.allowDrop} drop={this.props.drop}/>
                    <EntityList entities={this.props.data.delayedEntities} classes="six columns" drag={this.props.drag} allowDrop={this.props.allowDrop} drop={this.props.drop}/>
                </div>
            </div>
        )
    }
}

export default InitiativeDisplay;