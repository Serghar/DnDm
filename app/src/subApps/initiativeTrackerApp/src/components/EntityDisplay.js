import React, { Component } from 'react';

class EntityDisplay extends Component {
        render() {
                if(this.props.entity.name) {
                        if(this.props.entity.class) {
                                return (
                                        <li onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} draggable="true" onDragStart={(e) => this.props.drag(e)}>{this.props.entity.name}, the {this.props.entity.race} {this.props.entity.class}</li>
                                )
                        }
                        return (
                                <li onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} draggable="true" onDragStart={(e) => this.props.drag(e)}>{this.props.entity.name}, the {this.props.entity.race}</li>
                        )
                } else if(this.props.entity.class) {
                        return (
                                <li onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} draggable="true" onDragStart={(e) => this.props.drag(e)}>{this.props.entity.race} {this.props.entity.class}</li>
                        )
                }
                return (
                        <li onDrop={(e) => this.props.drop(e)} onDragOver={(e) => this.props.allowDrop(e)} draggable="true" onDragStart={(e) => this.props.drag(e)}>{this.props.entity.race}</li>
                )
        }
}

export default EntityDisplay;