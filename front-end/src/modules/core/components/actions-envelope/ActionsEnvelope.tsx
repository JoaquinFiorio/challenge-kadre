import styles from './ActionsEnvelope.module.css';

export const ActionsEnvelope = ({ children }: any) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}