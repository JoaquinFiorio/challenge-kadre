import { useState } from "react";
import { register } from "../api/Api";
import { useToast } from "../../core/hooks";
import { RegisterData } from "../interfaces/RegisterData";

export const useProfile = () => {

    const { showToast } = useToast();
    const [registering, setRegistering] = useState(false);


    const registerAnAccount = async (data: RegisterData) => {
        setRegistering(true);

        try {
            const resp: any = await register(data);
            showToast('Éxito', resp.message, 'success');
            setRegistering(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setRegistering(false);
        }
    };

    return {
        registering,
        registerAnAccount
    }
}