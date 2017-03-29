import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            return <li><EntityDisplay key={idx} entity={entity}/></li>
        });
        return (
            <div className="seven columns">
                <ol>
                    {entities}
                </ol>
            </div>
        )
    }
}

export default EntityList;