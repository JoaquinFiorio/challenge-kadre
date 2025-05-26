import styles from "./Sidebar.module.css";
import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebarRoutes } from "../../hooks";
import { User } from "../../../auth/interfaces";
import { Button } from "@nextui-org/react";
import { AuthContext } from "../../../auth/context/AuthContext";
import { ExitIcon } from "../../../../icons";
import { useMediaQuery } from "react-responsive";
import Logo from "../../../../assets/images/logo.jpeg";

interface SidebarProps {
  user: User | null
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

export const Sidebar = ({
  user,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {

  const { logOut } = useContext(AuthContext);
  const { sidebarRoutes } = useSidebarRoutes();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const sidebarExpanded = useRef(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  ).current;

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;

      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      ) {
        return;
      }

      setSidebarOpen(false);
    };


    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (status !== "authenticated") {
      setSidebarOpen(false);
    }
  }, [status, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const navigateToPath = (path: string) => {
    navigate(path);

    /* Close sidebar when navigating to a page in mobile */
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      ref={sidebar}
      className={`${styles.sidebar} ${sidebarOpen && styles.sidebarOpen}`}
    >
      <div className={styles.container}>
        {/* Header  */}
        <div className={styles.header}>
          <button
            ref={trigger}
            className={styles.triggerButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <svg
              className="fill-current text-primary"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
          <img
            className={styles.logo}
            src={Logo}
            alt="Logo"
          />
        </div>

        {/* User  */}
        <div className={styles.welcomeContainer}>
          <p className={styles.welcome}>
            Bienvenido
          </p>
          <div className={styles.usernameContainer}>
            <h1 className={styles.username}>
              {user && user.firstname + " " + user.lastname}
            </h1>
          </div>
          <Button
            color="primary"
            size="sm"
            variant="shadow"
            onPress={logOut}
            endContent={<ExitIcon />}
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Sidebar Navigation */}
        <nav className={styles.nav}>
          {sidebarRoutes ? sidebarRoutes.map(item => (
            <div
              key={item.path}
              className={`${styles.navItem} ${pathname === item.path && styles.navItemActive}`}
              onClick={() => navigateToPath(item.path)}
            >
              <button className={styles.menu}>
                {item.name}
              </button>
            </div>
          )) : <></>}
        </nav>
      </div>
    </aside>
  );
};