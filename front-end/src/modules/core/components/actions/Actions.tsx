import styles from './Actions.module.css';

interface Props {
    actions: JSX.Element;
}

export const Actions = ({ actions }: Props) => {

    return (
        <div className={styles.container}>
            <h1 className={styles.results}>
                Acciones
            </h1>
            <div className={styles.actions}>
                {actions}
            </div>
        </div>
    );
}