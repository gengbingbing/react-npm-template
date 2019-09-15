import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<button {...this.props} className='my-btn-style'><span>{this.props.children}</span></button>);
    }
}

Button.propTypes = {};

export default Button;