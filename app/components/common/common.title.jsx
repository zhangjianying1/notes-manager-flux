import React from 'react';
import classNames from 'classnames';

class Title extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className={_classEdit}>
                <input
                    className = 'b-folder__input'
                    ref = 'input'
                    autoFocus
                    value = { this.state.value }
                    onChange = { this._onChange.bind(this) }
                    onBlur = { this._update.bind(this) }
                    onKeyDown = {this._onKeyDown.bind(this)}
                    />
                <div className = 'b-folder__title'
                    >
                    {this.state.name}
                </div>
            </div>
        )
    }
}

export default Title;