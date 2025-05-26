import { Button, Input } from "@nextui-org/react";
import { useForm } from "../../core/hooks";
import { Breadcrumb, Card, FieldEnvelope, Padding } from "../../core/components";
import { ProfileData } from "../interfaces";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Profile = () => {

  const { user } = useContext(AuthContext);
  const { form, onChange } = useForm<ProfileData>({
    firstname: user?.firstname || '',
    lastname: user?.lastname || ''
  });

  return (
    <Padding>
      <Breadcrumb pageName={'Perfil'} />
      <Card>
        <FieldEnvelope>
          <Input
            label={'Nombre'}
            placeholder={'Por favor, ingrese su nombre'}
            variant="underlined"
            color="primary"
            value={form.firstname}
            onChange={(event: any) => onChange(event.target.value, 'firstname')}
          />
        </FieldEnvelope>
        <FieldEnvelope>
          <Input
            label={'Apellido'}
            placeholder={'Por favor, ingrese su apellido'}
            variant="underlined"
            color="primary"
            value={form.lastname}
            onChange={(event: any) => onChange(event.target.value, 'lastname')}
          />
        </FieldEnvelope>
        <div style={{ marginTop: 10 }}>
          <Button
            size="md"
            color="primary"
            variant="shadow"
            onPress={() => console.log('Save profile')}
          >
            Guardar
          </Button>
        </div>
      </Card>
    </Padding>
  );
}