import React, { Component } from 'react';
import FormElement from './FormElement';
import EntityList from './EntityList';

class InitiativeDisplay extends Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="./public/css/InitiativeTracker.css"/>
                <form onSubmit={(e) => this.props.addEntity(e)}>
                    <FormElement type="text" name="entityName" value={this.props.data.entityName} title="Name: " handler={this.props.handleChange}/>
                    <FormElement type="text" name="entityRace" value={this.props.data.entityRace} title="Race: " handler={this.props.handleChange}/>
                    <FormElement type="text" name="entityClass" value={this.props.data.entityClass} title="Class: " handler={this.props.handleChange}/>
                    <FormElement type="number" name="entityInitiative" value={this.props.data.entityInitiative} title="Initiative: " handler={this.props.handleChange}/>
                    <button type="submit">Add Entity</button>
                </form>
                <div className="row">
                    <EntityList id="entities" header="Initiative Order" entities={this.props.data.entities} classes="entity-list six columns" drag={this.props.drag} allowDrop={this.props.allowDrop} dragOut={this.props.dragOut} dragIn={this.props.dragIn} drop={this.props.drop} dragEnd={this.props.dragEnd}/>
                    <EntityList id="delayed" header="Delayed Characters" entities={this.props.data.delayedEntities} classes="entity-list five columns" drag={this.props.drag} allowDrop={this.props.allowDrop} dragOut={this.props.dragOut} dragIn={this.props.dragIn} drop={this.props.drop} dragEnd={this.props.dragEnd}/>
                </div>
            </div>
        )
    }
}

export default InitiativeDisplay;