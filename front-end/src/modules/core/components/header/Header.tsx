import styles from "./Header.module.css";
import { User } from "../../../auth/interfaces";

interface Props {
  user: User | null
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg: boolean) => void
};

export const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: Props) => {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <span className={styles.iconContainer}>
              <span className={styles.iconBlock}>
                <span
                  className={`${styles.iconSpan} ${!sidebarOpen && styles.iconSpanOpen}`}
                />
                <span
                  className={`${styles.iconSpan} ${styles.iconSpanDelayed} ${!sidebarOpen && styles.iconSpanDelayedOpen}`}
                />
                <span
                  className={`${styles.iconSpan} ${styles.iconSpanDelayedMore} ${!sidebarOpen && styles.iconSpanDelayedMoreOpen}`}
                />
              </span>
              <span className={styles.iconRotate}>
                <span
                  className={`${styles.iconRotateSpan} ${!sidebarOpen && styles.iconRotateSpanOpen}`}
                />
                <span
                  className={`${styles.iconRotateSpanDelayed} ${!sidebarOpen && styles.iconRotateSpanDelayedOpen}`}
                />
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};