import React, { Component } from 'react';

class EntityDisplay extends Component {
        render() {
                let content = "";

                if(this.props.entity.name) {
                        if(this.props.entity.class) {
                                content = `${this.props.entity.name}, the ${this.props.entity.race} ${this.props.entity.class}`;
                        } else {
                                content = `${this.props.entity.name}, the ${this.props.entity.race}`;
                        }
                } else if(this.props.entity.class) {
                        content = `${this.props.entity.race} ${this.props.entity.class}`;
                } else {
                        content = `${this.props.entity.race}`;
                }
                return (
                        <li id={this.props.entity.id} draggable="true" onDragStart={(e) => this.props.drag(e)} onDragEnter={(e) => this.props.dragIn(e)} onDragEnd={(e) => this.props.dragEnd(e)}>{content}</li>
                )
        }
}

export default EntityDisplay;