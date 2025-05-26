import { Button } from "@nextui-org/react";
import { Breadcrumb, Card, Padding } from "../../core/components";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Config = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <Padding>
      <Card>
        <Breadcrumb pageName={''} />
        <div style={{ marginTop: 10 }}>
          <Button
            size="md"
            color="danger"
            variant="shadow"
            onPress={() => logOut()}
          >
            Cerrar Sesión
          </Button>
        </div>
      </Card>
    </Padding>
  );
};
