import { RegisterData } from '../../interfaces';
import { FieldEnvelope, ModalContainer, ModalContent, ModalInfo, ModalLogo, ModalTitle } from '../../../core/components';
import { useProfile } from '../../hooks';
import { useForm } from '../../../core/hooks';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { KeyIcon } from '../../../../icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    visible: boolean
    onClose: () => void
    enableVisible: () => void
};

const GENRES = [
    { key: "male", label: "Masculino" },
    { key: "female", label: "Femenino" },
];

export const RegisterModal = ({
    visible,
    onClose,
    enableVisible
}: Props) => {

    const { t } = useTranslation();

    const { registerAnAccount, registering } = useProfile();
    const [hasJoinedByReferralLink, setHasJoinedByReferralLink] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { form, onChange, resetForm, setForm } = useForm<RegisterData>({
        firstname: '',
        lastname: '',
        genre: 'male',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        referral: '',
    });

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            const searchParams = new URLSearchParams(location.search);
            const username = searchParams.get('referral');

            if (username) {
                setForm({
                    referral: username,
                });

                setHasJoinedByReferralLink(true);

                enableVisible();
            };
        };
    }, [isMounted]);

    const handleRegister = async () => {
        const formData = { ...form };

        if (!hasJoinedByReferralLink) {
            delete formData.referral;
        };

        const resp: any = await registerAnAccount(formData);

        if (resp?.success) {
            closeModal();
        };
    };

    const closeModal = () => {
        resetForm();
        onClose();
    };

    return (
        <ModalContainer visible={visible} onCancel={closeModal}>
          <ModalLogo />
          <ModalTitle>{t("modal_title")}</ModalTitle>
          <ModalContent>
            <FieldEnvelope>
              <Input
                label={t("firstname_label")}
                placeholder={t("firstname_placeholder")}
                variant="underlined"
                color="primary"
                value={form.firstname}
                onChange={(event) => onChange(event.target.value, "firstname")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label={t("lastname_label")}
                placeholder={t("lastname_placeholder")}
                variant="underlined"
                color="primary"
                value={form.lastname}
                onChange={(event) => onChange(event.target.value, "lastname")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label={t("username_label")}
                placeholder={t("username_placeholder")}
                variant="underlined"
                color="primary"
                value={form.username}
                onChange={(event) => onChange(event.target.value, "username")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label={t("email_label")}
                placeholder={t("email_placeholder")}
                variant="underlined"
                color="primary"
                value={form.email}
                onChange={(event) => onChange(event.target.value, "email")}
                isDisabled={registering}
              />
            </FieldEnvelope>
            <FieldEnvelope>
              <Input
                label={t("password_label")}
                placeholder={t("password_placeholder")}
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
              {registering ? t("create_account_button.loading") : t("create_account_button.default")}
            </Button>
          </ModalContent>
        </ModalContainer>
      );
}