import React, { Component } from 'react';

class EntityDisplay extends Component {
        render() {
                let content;

                let classes = "entity-list-item";

                if( this.props.entity.moving ){
                        classes += " opaque";
                }

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
                        <li id={this.props.entity.id} className={classes} draggable="true" onDragStart={(e) => this.props.drag(e, this.props.entity)} onDragEnter={(e) => this.props.dragIn(e)} onDragEnd={(e) => this.props.dragEnd(e, this.props.entity.id)}>{content} </li>
                )
        }
}

export default EntityDisplay;