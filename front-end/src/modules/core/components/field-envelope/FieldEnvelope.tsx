import styles from './FieldEnvelope.module.css';

export const FieldEnvelope = ({ children }: any) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}