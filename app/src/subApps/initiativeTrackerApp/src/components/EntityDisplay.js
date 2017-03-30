import React, { Component } from 'react';

class EntityDisplay extends Component {
        render() {
                if(this.props.entity.name) {
                        if(this.props.entity.class) {
                                return (
                                        <p>{this.props.entity.name}, the {this.props.entity.race} {this.props.entity.class}</p>
                                )
                        }
                        return (
                                <p>{this.props.entity.name}, the {this.props.entity.race}</p>
                        )
                } else if(this.props.entity.class) {
                        return (
                                <p>{this.props.entity.race} {this.props.entity.class}</p>
                        )
                }
                return (
                        <p>{this.props.entity.race}</p>
                )
        }
}

export default EntityDisplay;