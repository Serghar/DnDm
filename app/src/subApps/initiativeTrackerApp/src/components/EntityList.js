import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            return (<EntityDisplay key={idx} drop={this.props.drop} allowDrop={this.props.allowDrop} drag={this.props.drag} entity={entity} initiative={entity.initiative}/>);
        });
        return (
            <ol className={this.props.classes}>
                    {entities}
            </ol>
        )
    }
}

export default EntityList;