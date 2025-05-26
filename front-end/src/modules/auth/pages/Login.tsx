import { Input, Button, Link, Checkbox } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { useForm } from '../../core/hooks';
import { LoginData } from '../interfaces';
import { AuthContext } from '../context/AuthContext';
import { KeyIcon, ProfileIcon } from '../../../icons';
import { LoginStructure, RegisterFieldEnvelope } from '../components';
import { FieldEnvelope } from '../../core/components';
import { RegisterModal } from '../modals';
import { useTranslation } from 'react-i18next';

export const Login = () => {

  const { t } = useTranslation();

  const { signIn, loadingSignIn } = useContext(AuthContext);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const { form, onChange } = useForm<LoginData>({
    email: '',
    password: ''
  });

  const handleLogin = () => signIn(form);

  return (
    <>
      <LoginStructure
        miniTitle={t('welcomeTitle')}
        title={t('loginTitle')}
      >
        <FieldEnvelope>
          <Input
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            variant="underlined"
            color="primary"
            value={form.email}
            endContent={<ProfileIcon />}
            onChange={(event) => onChange(event.target.value, 'email')}
          />
        </FieldEnvelope>
        <FieldEnvelope>
          <Input
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            variant="underlined"
            color="primary"
            value={form.password}
            type="password"
            endContent={<KeyIcon />}
            onChange={(event) => onChange(event.target.value, 'password')}
            onKeyUp={(e) => e.key === 'Enter' && handleLogin()}
          />
        </FieldEnvelope>
        <RegisterFieldEnvelope>
          <Link
            style={{ cursor: 'pointer' }}
            color="primary"
            size="sm"
            onPress={() => setRegisterModalVisible(true)}
          >
            {t('noAccount')} <span style={{ color: 'var(--gray-color)', marginLeft: 5, fontFamily: 'var(--font-family-bold)', cursor: 'pointer' }}>{t('register')}</span>
          </Link>
          <Link
            style={{ cursor: 'pointer' }}
            color="primary"
            size="sm"
            onPress={() => console.log('Forgot Password Clicked')}
          >
            {t('forgotPassword')}
          </Link>
        </RegisterFieldEnvelope>
        <Button
          style={{ marginTop: 10, marginBottom: 20, width: '100%' }}
          color="primary"
          variant="shadow"
          size="md"
          onPress={handleLogin}
          isLoading={loadingSignIn}
          isDisabled={loadingSignIn || !termsAccepted}
        >
          {t('loginButton')}
        </Button>
        <FieldEnvelope>
          <Checkbox
            isSelected={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <span style={{ color: 'var(--gray-color)', fontFamily: 'var(--font-family-semi-bold)' }}>
            {t('acceptTerms')} <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>{t('termsAndConditions')}</span> {t('loginInfo')} <span style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>{t('privacyPolicy')}</span>.
          </span>
        </FieldEnvelope>
      </LoginStructure>

      {/* Modals */}
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        enableVisible={() => setRegisterModalVisible(true)}
      />
    </>
  );
}