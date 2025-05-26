// MICROSERVICE
const MICROSERVICE_NAME = 'Kadre'

// PLATFORM
const PLATFORM_NAME = 'Kadre';

// TIME ZONE
const TIMEZONE = 'America/Buenos Aires';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ENUM_STATE = {
    PENDIENTE: 'PENDIENTE',
    EN_TRANSITO: 'EN TRANSITO',
    FINALIZADO: 'FINALIZADO',
    CANCELADO: 'CANCELADO'
};

const FUEL_TYPE = {
    NAFTA: 'NAFTA',
    DIESEL: 'DIESEL',
    GNC: 'GNC',
    BIODIESEL: 'BIODIESEL',
    ELECTRICO: 'ELECTRICO',
};

const MAX_LIMIT = 100;

module.exports = {
    MAX_LIMIT,
    FUEL_TYPE,
    ENUM_STATE,
    MICROSERVICE_NAME,
    PLATFORM_NAME,
    TIMEZONE,
    EMAIL_REGEXP,
};