import styles from './TableText.module.css';

export const TableText = ({ children }: any) => {
    return (
        <p className={styles.text}>
            {children || 'N/A'}
        </p>
    );
}