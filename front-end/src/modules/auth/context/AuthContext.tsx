import { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from './AuthReducer';
import { AuthState, LoginData, User } from '../interfaces';
import { useToast } from '../../core/hooks';
import { getUserLogged, login } from '../api/Api';

interface AuthContextProps {
	status: 'checking' | 'authenticated' | 'not-authenticated'
	token: string | null
	user: User | null
	loadingSignIn: boolean
	loadUser: () => void
	signIn: (loginData: LoginData) => void
	logOut: () => void
}

const authInitialState: AuthState = {
	status: 'checking',
	token: null,
	user: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

	const { showToast } = useToast();
	const [state, dispatch] = useReducer(authReducer, authInitialState);
	const [loadingSignIn, setLoadingSignIn] = useState(false);

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		await new Promise(resolve => setTimeout(resolve, 5000));

		const token = await localStorage.getItem('token');
		if (!token) return dispatch({ type: 'notAuthenticated' });

		try {
			const user_info_response: any = await getUserLogged();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user: user_info_response,
				}
			});

		} catch (e: any) {
			await localStorage.removeItem('token');
			dispatch({ type: 'notAuthenticated' });
			showToast('Error', e, 'error');
		}
	};

	const signIn = async (data: LoginData) => {
		const { email, password } = data;
		if (email === '') return showToast('Campo vacío', 'Debes ingresar un correo electrónico', 'error');
		if (password === '') return showToast('Campo vacío', 'Debes ingresar la contraseña', 'error');

		setLoadingSignIn(true);

		try {
			const login_response: any = await login(data);
			const { message, token } = login_response;
			await localStorage.setItem('token', token);

			const user_info_response: any = await getUserLogged();

			dispatch({
				type: 'signIn',
				payload: {
					token,
					user: user_info_response,
				}
			});

			showToast('¡Bienvenid@!', message, 'success');
			setLoadingSignIn(false);

		} catch (e: any) {
			setLoadingSignIn(false);
			showToast('Error', e, 'error');
		}
	};

	const logOut = () => {
		localStorage.clear();
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{
			...state,
			loadingSignIn,
			loadUser,
			signIn,
			logOut
		}}>
			{children}
		</AuthContext.Provider>
	)
}