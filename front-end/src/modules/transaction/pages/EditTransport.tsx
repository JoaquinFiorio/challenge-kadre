import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../core/hooks";
import { Breadcrumb, Card, FieldEnvelope, Padding } from "../../core/components";
import { useTransport } from "../hooks";
import { useEffect } from "react";
import { FUEL_TYPE, formatDateForInput } from "../utils/constants";


export const EditTransport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { transport } = location.state || {};

    const { updateTransport, updating } = useTransport();

    const { form, onChange, setForm } = useForm({
        truck: '',
        driver: '',
        origin: '',
        destination: '',
        fuel_type: '',
        gallons: 0,
        departure_date: ''
    });

    useEffect(() => {
        if (transport) {
        
            setForm({
                truck: transport.truck || '',
                driver: transport.driver || '',
                origin: transport.origin || '',
                destination: transport.destination || '',
                fuel_type: transport.fuel_type || '',
                gallons: transport.gallons || 0,
                departure_date: formatDateForInput(transport.departure_date) || ''
            });
        }
    }, [transport]);

    const handleSubmit = async () => {
        const response: any = await updateTransport(transport._id, form);
        if (response?.success) {
            handleGoBack();
        }
    };

    const handleGoBack = () => navigate('/trucks-list');

    return (
        <Padding>
            <Breadcrumb pageName={'Editar Transporte: ' + transport.id} />
            <Card>
                <FieldEnvelope>
                    <Input
                        label="Camión"
                        placeholder="Ej: ABC123"
                        variant="underlined"
                        value={form.truck}
                        onChange={(e) => onChange(e.target.value, 'truck')}
                    />
                    <Input
                        label="Conductor"
                        placeholder="Ej: Juan Pérez"
                        variant="underlined"
                        value={form.driver}
                        onChange={(e) => onChange(e.target.value, 'driver')}
                    />
                    <Input
                        label="Origen"
                        placeholder="Ej: Ciudad de México"
                        variant="underlined"
                        value={form.origin}
                        onChange={(e) => onChange(e.target.value, 'origin')}
                    />
                    <Input
                        label="Destino"
                        placeholder="Ej: Guadalajara"
                        variant="underlined"
                        value={form.destination}
                        onChange={(e) => onChange(e.target.value, 'destination')}
                    />
                    <Select
                        label="Tipo de combustible"
                        variant="underlined"
                        selectedKeys={[form.fuel_type]}
                        onChange={(e) => onChange(e.target.value, 'fuel_type')}
                    >
                        {FUEL_TYPE.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>
                                {fuel}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="Galones"
                        placeholder="Ingrese la cantidad de galones"
                        variant="underlined"
                        type="number"
                        value={form.gallons.toString()}
                        onChange={(e) => onChange(parseFloat(e.target.value), 'gallons')}
                    />
                    <Input
                        label="Fecha de salida"
                        type="datetime-local"
                        variant="underlined"
                         value={form.departure_date}
                        onChange={(e) => onChange(e.target.value, 'departure_date')}
                    />
                </FieldEnvelope>

                <div style={{ marginTop: 10 }}>
                    <Button
                        size="md"
                        color="primary"
                        variant="shadow"
                        onPress={handleSubmit}
                        isLoading={updating}
                        isDisabled={
                            updating ||
                            !form.truck ||
                            !form.driver ||
                            !form.origin ||
                            !form.destination ||
                            !form.fuel_type ||
                            form.gallons <= 0 ||
                            !form.departure_date
                        }
                    >
                        Ingresar datos
                    </Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        size="md"
                        color="default"
                        variant="ghost"
                        onPress={handleGoBack}
                        isDisabled={updating}
                    >
                        Cancelar
                    </Button>
                </div>
            </Card>
        </Padding>
    );
};
