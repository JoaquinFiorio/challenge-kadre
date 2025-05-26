import styles from './RegisterFieldEnvelope.module.css';

export const RegisterFieldEnvelope = ({ children }: any) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
