import React from 'react';
import tvImage from './television.png';
import styles from './Television.css';

class Television extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.modalOverlay}></div>
                <div className={styles.modalForeground}>
                    <div className={styles.modalContent}>
                        <img
                            src={tvImage}
                            alt="Television Frame"
                            className={styles.television}
                        />
                        <div className={styles.video}>
                            <video autoPlay controls>
                                <source src="http://video.makervision.io/welcome.mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Television;
