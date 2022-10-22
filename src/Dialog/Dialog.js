// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from '../Modal/Modal.js';

// Styles
import styles from './Dialog.module.css';

const Dialog = props => {
    const {onClose} = props;

    return (
        <Modal>
            <div className={styles.backdrop}></div>
            <div className={styles.dialog}>
                <div className={styles.paper}>
                    <div>
                        <h2 className={styles.dialogTitle}>Dialog title</h2>
                        {onClose ? (
                            <button onClick={onClose} className={styles.closeButton}>Close</button>
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
