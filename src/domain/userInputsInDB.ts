export interface userInputsInDB{
    user_inputs_id : number;
    user_id: number;
    numberOfPeopleLiveInHouse: number;
    typeOfHouse : string;
    foodCategory : string;
    amountSpentForFood: number;
    goodsCategory : string;
    amountSpentForGoods : number;
    travelledDistanceInMilesByBus : number;
    carSize : string;
    fuelType : string;
    travelledDistanceInMilesByCar : number;
    typeOfPassengerOnFerry : string;
    travelledDistanceInMilesByFerry : number;
    seatclass : string;
    flightCategory : string;
    travelledDistanceInMilesInFlight : number;
    motorbikeSize: string;
    travelledDistanceInMilesByMotorbike: number;
    railType: string;
    travelledDistanceInMilesByRail:number;
    taxiType : string;
    travelledDistanceInMilesByTaxi : number;
}