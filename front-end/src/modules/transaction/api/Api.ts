import { API } from "../../core/api/Instances";
import { rejectApiError } from "../../core/helpers/RejectApiError";
import { Transport } from "../interfaces";


const getTransportations = () => {
    return new Promise((resolve, reject) => {
        API.get('/api/transport/get-transports')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const getGallonsCount = () => {
    return new Promise((resolve, reject) => {
        API.get('/api/transport/get-gallons-count')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const getTransportationCount = () => {
    return new Promise((resolve, reject) => {
        API.get('/api/transport/get-transports-count')
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const getTransportation = (id: string) => {
    return new Promise((resolve, reject) => {
        API.get('/api/transport/get-transports/' + id)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const createTransportation = (form: Transport) => {
    return new Promise((resolve, reject) => {
        API.post('/api/transport/create-transport', form )
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const updateTransportation = (id: number, transport: Transport) => {
    return new Promise((resolve, reject) => {
        API.put('/api/investment/new_investment/' + id, transport)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const updateTransportationState = (id: string, state: string) => {
    return new Promise((resolve, reject) => {
        API.patch('/api/transport/update-transport-state/' + id , { state })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

const updateTransportationFuelType = (id: string, fuel_type: string) => {
    return new Promise((resolve, reject) => {
        API.patch('/api/transport/update-transport-fuel/' + id , { fuel_type })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(rejectApiError(error.response.data)));
    });
};

export {
    getGallonsCount,
    getTransportationCount,
    getTransportations,
    createTransportation,
    updateTransportation,
    updateTransportationState,
    getTransportation,
    updateTransportationFuelType
}