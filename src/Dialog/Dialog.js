import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal.js';
import './Dialog.css';

const Dialog = props => {
    const {onClose} = props;

    return (
        <Modal>
            <div className="backdrop"></div>
            <div className="dialog">
                <div className="paper">
                    <div>
                        <h2 className="dialog-title">Dialog title</h2>
                        {onClose ? (
                            <button onClick={onClose} className="close-button">Close</button>
                        ) : null}
                    </div>
                    {props.children}
                </div>
            </div>
        </Modal>
    );
};

Dialog.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Dialog;
