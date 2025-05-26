import styles from './LoginStructure.module.css';
import Logo from '../../../../assets/images/logo.jpeg';

interface Props {
    miniTitle: string
    title: string
    children: JSX.Element | JSX.Element[]
}

export const LoginStructure = ({ miniTitle, title, children }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h1 className={styles.miniTitle}>
                        {miniTitle}
                    </h1>
                    <p className={styles.loginText}>
                        {title}
                    </p>
                    {children}
                </div>
            </div>
            <div className={styles.imageSection}>
                <img
                    className={styles.logo}
                    src={Logo}
                    alt="Logo"
                />
            </div>
        </div>
    );
}