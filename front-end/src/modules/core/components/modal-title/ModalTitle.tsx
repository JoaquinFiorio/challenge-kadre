import styles from './ModalTitle.module.css';

export const ModalTitle = ({ children }: any) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {children}
            </h1>
        </div>
    )
}