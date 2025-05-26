import styles from './ModalLogo.module.css';
import LogoImage from '../../../../assets/images/logo.jpeg';

export const ModalLogo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img
                    className={styles.logo}
                    src={LogoImage}
                    alt="Logo"
                />
            </div>
        </div>
    )
};