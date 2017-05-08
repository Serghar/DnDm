import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            return (<EntityDisplay key={idx} drag={this.props.drag} dragOut={this.props.dragOut} dragIn={this.props.dragIn} dragEnd={this.props.dragEnd} entity={entity}/>);
        });

        return (
            <ul onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} onDragEnter={(e) => this.props.dragIn(e)} id={this.props.id} className={this.props.classes}>
                    <li className="list-header" draggable="false" onDragEnter={(e) => this.props.dragIn(e)}>{this.props.header}</li>
                    {/*<li className={dropTargetClass} draggable="false"> &#10164 Drop entities here U+202e &#10164 </li>*/}
                    {entities}
            </ul>
        )
    }
}

export default EntityList;