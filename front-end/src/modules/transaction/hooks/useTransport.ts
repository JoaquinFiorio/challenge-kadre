import { useState } from "react";
import { Transport } from "../interfaces";
import { useToast } from "../../core/hooks";
import { createTransportation, getGallonsCount, getTransportationCount, getTransportations, updateTransportation, updateTransportationFuelType, updateTransportationState } from "../api/Api";

export const useTransport = () => {

    const { showToast } = useToast();
    const [creating, setCreating] = useState(false);
    const [loadingTransports, setLoadingTransports] = useState(false);
    const [transports, setTransports] = useState<Transport[]>([]);
    const [updating, setUpdating] = useState(false);
    const [gallons, setGallons] = useState(0);
    const [transportsCount, setTransportsCount] = useState(0);

    const newTransport = async (form: Transport) => {
        setCreating(true);

        try {
            const { message }: any = await createTransportation(form);

            showToast('', message || 'Inversión solicitada', 'success');
            setCreating(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setCreating(false);
        }
    };

    const loadTransports = async () => {
        setLoadingTransports(true);

        try {
            const resp: any = await getTransportations();

            setTransports(resp.transports);
            setLoadingTransports(false);

        } catch (e: any) {
            setLoadingTransports(false);
            showToast('Error', e, 'error');
        }
    };

    const loadGallonsCount = async () => {
        setLoadingTransports(true);

        try {
            const resp: any = await getGallonsCount();

            setGallons(resp.gallons);
            setLoadingTransports(false);

        } catch (e: any) {
            setLoadingTransports(false);
            showToast('Error', e, 'error');
        }
    };

    const loadTransportsCount = async () => {
        setLoadingTransports(true);

        try {
            const resp: any = await getTransportationCount();

            setTransportsCount(resp.count);
            setLoadingTransports(false);

        } catch (e: any) {
            setLoadingTransports(false);
            showToast('Error', e, 'error');
        }
    };

    const updateTransport = async (id: string, transport: Transport) => {
        setUpdating(true);

        try {
            const { message }: any = await updateTransportation(id, transport);

            showToast('', message || 'Inversión actualizada', 'success');
            setUpdating(false);
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setUpdating(false);
        }
    };

    const updateTransportState = async (transportId: string, state: string) => {
        setUpdating(true);

        try {
            const { message }: any = await updateTransportationState(transportId, state);
            
            showToast('', message || 'Estado del transporte actualizado', 'success');
            
            setUpdating(false);
            
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setUpdating(false);
        }
    };

    const updateTransportFuel = async (transportId: string, fuel_type: string) => {
        setUpdating(true);

        try {
            const { message }: any = await updateTransportationFuelType(transportId, fuel_type);
            
            showToast('', message || 'Estado del transporte actualizado', 'success');
            
            setUpdating(false);
            
            return { success: true };

        } catch (e: any) {
            showToast('Error', e, 'error');
            setUpdating(false);
        }
    };

    return {
        loadTransportsCount,
        loadGallonsCount,
        loadTransports,
        newTransport,
        updateTransportState,
        updateTransport,
        updateTransportFuel,
        gallons,
        transportsCount,
        creating,
        loadingTransports,
        transports,
        updating
    }
}