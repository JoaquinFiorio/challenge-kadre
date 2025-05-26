import styles from "./Header.module.css";
import { Button } from "@nextui-org/react";
import { User } from "../../../auth/interfaces";
import { CopyIcon } from "../../../../icons";
import { useToast } from "../../hooks";
import { useTranslation } from "react-i18next";

interface Props {
  user: User | null
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg: boolean) => void
};

const APP_URL = import.meta.env.VITE_APP_URL;

export const Header = ({
  user,
  sidebarOpen,
  setSidebarOpen,
}: Props) => {

  const { showToast } = useToast();

  const copy = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast('Éxito', 'Enlace de referido copiado', 'success');
  };

  const { t } = useTranslation();

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