import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            if ( idx != 0){
                return ( <EntityDisplay key={idx} drag={this.props.drag} dragIn={this.props.dragIn} dragEnd={this.props.dragEnd} entity={entity}/> );
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