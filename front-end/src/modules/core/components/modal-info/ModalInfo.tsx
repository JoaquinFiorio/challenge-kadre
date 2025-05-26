import styles from './ModalInfo.module.css';

export const ModalInfo = ({ children }: any) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.info}>
                {children}
            </h1>
        </div>
    )
}