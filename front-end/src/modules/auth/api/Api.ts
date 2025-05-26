import { API } from "../../core/api/Instances";
import { rejectApiError } from "../../core/helpers/RejectApiError";
import { LoginData, RegisterData } from "../interfaces";

const login = (data: LoginData) => {
    return new Promise((resolve, reject) => {
        API.post('/api/auth/login', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const register = (data: RegisterData) => {
    return new Promise((resolve, reject) => {
        API.post('/api/auth/register', data)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const getUserLogged = () => {
    return new Promise((resolve, reject) => {
        API.get('/api/auth/get-user')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

export {
    login,
    register,
    getUserLogged,
}