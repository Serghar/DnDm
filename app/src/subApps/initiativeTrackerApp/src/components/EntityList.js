import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        if ( !this.props.turnIndicator ) {
            this.props.turnIndicator = -1;
        }

        let entities = this.props.entities.map((entity, idx) => {
            // idx == 0 is the placeholder header entity, and should not be displayed using the EntityDisplay component
            if ( idx != 0){
                let currentActor = false;
                if ( idx == this.props.turnIndicator ) {
                    currentActor = true;
                }
                return ( <EntityDisplay key={parseInt(idx)} drag={this.props.drag} dragIn={this.props.dragIn} dragEnd={this.props.dragEnd} entity={entity} currentActor={currentActor}/> );
            }
        });

        // let placeholderClass;
        // if ( entities.length < 2 ){
        //     placeholderClass = "centered-li";
        // } else {
        //     placeholderClass = "hide";
        // }

        return (
            <ul id={this.props.id} onDrop={(e) => this.props.drop(e)} onDragEnter={(e) => this.props.dragIn(e)} onDragOver={(e) => this.props.allowDrop(e)} className={this.props.classes}>
                    <li id={this.props.id} className="bordered centered-li" draggable="false" onDragEnter={(e) => this.props.dragIn(e)}>{this.props.header}</li>
                    {/*<li id={this.props.id} className={placeholderClass} draggable="false"> <span className="font-medium">&#10164;</span> Drop entities here <span className="font-medium">&#8207; test &#10164;</span> </li>*/}
                    {entities}
            </ul>
        )
    }
}

export default EntityList;