import styles from './Card.module.css';
import { Card as CardComponent } from "@nextui-org/react";

export const Card = ({ children }: any) => {
    return (
        <CardComponent
            className={styles.container}
            radius="none"
            shadow="lg"
        >
            {children}
        </CardComponent>
    )
}