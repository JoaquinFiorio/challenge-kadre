import styles from './TableAmount.module.css';

export const TableAmount = ({ children }: any) => {

    return (
        <div className={styles.container}>
            <p className={styles.text}>
                {children && <span>$ </span>}
            </p>
            <h1 className={styles.amount}>
                {children ? (children) : 'N/A'}
                {children && (
                    <small >
                        {(children) ? '.' + (children) : '.00'}
                    </small>
                )}
            </h1>
        </div>
    );
}