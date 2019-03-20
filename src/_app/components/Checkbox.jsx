import React from 'react';

function Checkbox(props) {
    return (
        <button className="checkbox icon" onClick={props.onChange} type="button">
            <i className="material-icons">{props.checked ? 'check_box' : 'check_box_outline_blank'}</i>
        </button>
    );
}

export default Checkbox;
