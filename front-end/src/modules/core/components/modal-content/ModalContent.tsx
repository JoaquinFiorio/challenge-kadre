import styles from './ModalContent.module.css';

export const ModalContent = ({ children }: any) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
