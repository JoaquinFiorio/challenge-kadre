import { RegisterData } from '../../interfaces';
import { FieldEnvelope, ModalContainer, ModalContent, ModalLogo, ModalTitle } from '../../../core/components';
import { useProfile } from '../../hooks';
import { useForm } from '../../../core/hooks';
import { Button, Input } from '@nextui-org/react';
import { KeyIcon } from '../../../../icons';

interface Props {
    visible: boolean
    onClose: () => void
    enableVisible: () => void
};

export const RegisterModal = ({
    visible,
    onClose,
}: Props) => {

    const { registerAnAccount, registering } = useProfile();
    const { form, onChange, resetForm } = useForm<RegisterData>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });

    const handleRegister = async () => {
        const formData = { ...form };

        const resp: any = await registerAnAccount(formData);

        if (resp?.success) {
            closeModal();
        }
    };

    const closeModal = () => {
        resetForm();
        onClose();
    };

    return (
        <ModalContainer visible={visible} onCancel={closeModal}>
          <ModalLogo />
          <ModalTitle>Regístrate</ModalTitle>
          <ModalContent>
            <FieldEnvelope>
              <Input
                label='Primer nombre'
                placeholder='Primer nombre'
                variant="underlined"
                color="primary"
                value={form.firstname}
                onChange={(event) => onChange(event.target.value, "firstname")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label="Primer apellido"
                placeholder="Primer apellido"
                variant="underlined"
                color="primary"
                value={form.lastname}
                onChange={(event) => onChange(event.target.value, "lastname")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                variant="underlined"
                color="primary"
                value={form.username}
                onChange={(event) => onChange(event.target.value, "username")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label="Correo electrónico"
                placeholder="tucorreo@gmail.com"
                variant="underlined"
                color="primary"
                value={form.email}
                onChange={(event) => onChange(event.target.value, "email")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label="Nueva contraseña"
                placeholder="*********************"
                variant="underlined"
                color="primary"
                value={form.password}
                type="password"
                endContent={<KeyIcon />}
                onChange={(event) => onChange(event.target.value, "password")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <Button
              color="primary"
              variant="shadow"
              size="md"
              onPress={handleRegister}
              isLoading={registering}
              isDisabled={
                registering ||
                !form.firstname ||
                !form.lastname ||
                !form.username ||
                !form.email ||
                !form.password
              }
            >
              {registering ? 'Registrando...' : 'Crear cuenta'}
            </Button>
          </ModalContent>
        </ModalContainer>
      );
}