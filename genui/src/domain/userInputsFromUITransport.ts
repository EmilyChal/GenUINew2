export interface UserInputsFromUITransport{
    user_id: number | null;
    calculationMonth:string | null;
    travelledDistanceInMilesByBus : number | null;
    carSize : string | null;
    fuelType : string | null;
    travelledDistanceInMilesByCar? : number | null;
    typeOfPassengerOnFerry? : string | null;
    travelledDistanceInMilesByFerry? : number | null;
    seatclass   : string | null;
    flightCategory : string | null;
    travelledDistanceInMilesInFlight? : number | null;
    motorbikeSize?: string | null;
    travelledDistanceInMilesByMotorbike?: number | null;
    railType : string | null;
    travelledDistanceInMilesByRail:number | null;
    taxiType : string | null;
    travelledDistanceInMilesByTaxi : number | null;
}