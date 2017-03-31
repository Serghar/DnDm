import React, { Component } from 'react';
import EntityDisplay from './EntityDisplay';

class EntityList extends Component {
    render() {
        let entities = this.props.entities.map((entity, idx) => {
            return (<li onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} key={idx} draggable="true" onDragStart={(e) => this.props.drag(e)}><EntityDisplay entity={entity}/></li>);
        });
        return (
            <div className={this.props.classes}>
                <ol>
                    {entities}
                </ol>
            </div>
        )
    }
}

export default EntityList;