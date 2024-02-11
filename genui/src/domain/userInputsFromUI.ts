export interface UserInputsFromUI{
    user_id: string | null;
    calculationMonth:string | null,
    numberOfPeopleLiveInHouse: number | null;
    typeOfHouse? : string | null;
    preparedMeals: string | null,
    meat: string | null,
    oils:string | null,
    bread: string | null,
    fruit:string | null,
    fish:string | null,
    milk:string | null,
     restaurants: string | null,
     hotels:string | null,
     pharmaceutical:string | null,
     repairElectricAppliances:string | null,
     electricAppliances:string | null,
     education:string | null,
     hairdressing:string | null,
     books:string | null,
     sportEquipment:string | null,
    hobbies:string | null,
    hospital:string | null,
    medical:string | null,
    utensils:string | null,
    repairFurniture:string | null,
    furniture:string | null,
    footwear:string | null,
    clothingAccessories:string | null,
    clothes:string | null,
    burningOilInKwh : number | null;
    woodLogsInTonnes: number | null,
    propaneInKwh: number | null,
    naturalGasInKwh: number | null,
    lpgInKwh: number | null,
    electricityInKwh: number | null,
    electronicalEquipment:number | null,
    travelledDistanceInMilesByBus? : number | null;
    carSize? : string | null;
    fuelType? : string | null;
    travelledDistanceInMilesByCar? : number | null;
    typeOfPassengerOnFerry? : string | null;
    travelledDistanceInMilesByFerry? : number | null;
    seatclass? : string | null;
    flightCategory? : string | null;
    travelledDistanceInMilesInFlight? : number | null;
    motorbikeSize?: string | null;
    travelledDistanceInMilesByMotorbike?: number | null;
    railType?: string | null;
    travelledDistanceInMilesByRail?:number | null;
    taxiType? : string | null;
    travelledDistanceInMilesByTaxi? : number | null;
}