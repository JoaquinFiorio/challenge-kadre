import { useRouteError } from "react-router-dom";
import LogoImage from './assets/images/logo.jpeg';

export const ErrorPage = () => {

  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img
        src={LogoImage}
        alt="Logo"
        style={{
          height: '7.5rem',
          objectFit: 'contain',
          marginBottom: '1rem'
        }}
      />
      <h1 style={{
        fontSize: 'var(--font-size-10)',
        fontFamily: 'var(--font-family-extra-bold-italic)',
        color: 'var(--primary-color)'
      }}>
        Oops!
      </h1>
      <p style={{
        fontSize: 'var(--font-size-5)',
        fontFamily: 'var(--font-family-semi-bold)',
        color: 'var(--primary-color)',
        opacity: '.75',
      }}>
        {error.statusText || error.message}
      </p>
    </div>
  );
}