import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            return (<EntityDisplay key={idx} drop={this.props.drop} drag={this.props.drag} dragOut={this.props.dragOut} dragIn={this.props.dragIn} dragEnd={this.props.dragEnd} entity={entity}/>);
        });
        return (
            <ul onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} id={this.props.id} className={this.props.classes}>
                    {entities}
            </ul>
        )
    }
}

export default EntityList;