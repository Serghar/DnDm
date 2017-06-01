import React, { Component } from 'react';
import FormElement from './FormElement';
import EntityList from './EntityList';

class InitiativeDisplay extends Component {
    render() {
        return (
            <div className="initiative-main">
                <link rel="stylesheet" href="./public/css/InitiativeTracker.css"/>
                <div>
                    <form onSubmit={(e) => this.props.addEntity(e)}>
                        <FormElement type="text" name="entityName" value={this.props.data.entityName} title="Name: " handler={this.props.handleChange}/>
                        <FormElement type="text" name="entityRace" value={this.props.data.entityRace} title="Race: " handler={this.props.handleChange}/>
                        <FormElement type="text" name="entityClass" value={this.props.data.entityClass} title="Class: " handler={this.props.handleChange}/>
                        <FormElement type="number" name="entityInitiative" value={this.props.data.entityInitiative} title="Initiative: " handler={this.props.handleChange}/>
                        <button type="submit">Add Entity</button>
                    </form>
                    <button onClick={() => this.props.nextTurn()}>Next Turn</button>
                    <button onClick={() => this.props.rollBackTurn()}>Previous Turn</button>
                </div>
                <div>
                    <div className="five-percent-spacer"></div>
                    <div className="inline-block">
                        <div className="parchment-top"></div>
                        <EntityList id="entities" header="Initiative Order" entities={this.props.data.entities} classes="entity-list list" drag={this.props.drag} allowDrop={this.props.allowDrop} dragIn={this.props.dragIn} drop={this.props.drop} dragEnd={this.props.dragEnd} turnIndicator={this.props.data.turnIndicator}/>
                        <div className="parchment-bottom"></div>
                    </div>
                    <div className="inline-block">
                        <div className="parchment-top"></div>
                        <EntityList id="delayed" header="Delayed Characters" entities={this.props.data.delayedEntities} classes="entity-list list" drag={this.props.drag} allowDrop={this.props.allowDrop} dragIn={this.props.dragIn} drop={this.props.drop} dragEnd={this.props.dragEnd}/>
                        <div className="parchment-bottom"></div>
                    </div>
                    <div className="five-percent-spacer"></div>
                </div>
            </div>
        )
    }
}

export default InitiativeDisplay;