export interface Transport {
    _id?: string
    origin: string
    gallons: number
    state?: string
    destination: string
    departure_date: Date | string
    fuel_type: string
    driver: string
    truck: string
    createdAt?: Date
    updatedAt?: Date
}