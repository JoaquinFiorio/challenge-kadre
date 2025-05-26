export const FUEL_TYPE = [
    'NAFTA',
    'DIESEL',
    'GNC',
    'BIODIESEL',
    'ELECTRICO'
];

export const STATES = [
    'PENDIENTE',
    'EN TRANSITO',
    'FINALIZADO',
    'CANCELADO'
];

export const formatDateForInput = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16);
};