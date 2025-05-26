import styles from './Padding.module.css';

export const Padding = ({ children }: any) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}