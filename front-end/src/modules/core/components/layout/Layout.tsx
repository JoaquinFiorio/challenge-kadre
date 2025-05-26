import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { AuthContext } from "../../../auth/context/AuthContext";
import styles from './Layout.module.css';

export const Layout = () => {

    const { user } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <Sidebar
                user={user}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className={styles.mainContent}>
                <Header
                    user={user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main className={styles.contentWrapper}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}