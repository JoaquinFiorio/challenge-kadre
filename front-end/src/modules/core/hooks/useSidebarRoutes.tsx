import { useState } from "react";

const ROUTES = [
  {
    name: "Dashboard",
    path: "/"
  },
  {
    name: "Lista de Camiones",
    path: "/trucks-list"
  },
  {
    name: "Perfil",
    path: "/profile"
  }
];

export const useSidebarRoutes = () => {

  //@ts-ignore
  const [sidebarRoutes, setSidebarRoutes] = useState<any[]>(ROUTES);
  
  return {
    sidebarRoutes,
  };
};
