import React, { Component } from 'react';

class FormElement extends Component {
    render() {
        return (
            <div>
                <span>
                    {this.props.title}
                </span>
                <input name={this.props.name} onChange={(e) => this.props.handler(e)} type={this.props.type} value={this.props.value}/>
            </div>
        )
    }
}

export default FormElement;