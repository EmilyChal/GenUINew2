export interface UserInputsFromUIEnergy{
    
    user_id: number | null,
    username : string,
    burningOilInKwh: number | null,
    woodLogsInTonnes: number | null,
    propaneInKwh: number | null,
    naturalGasInKwh: number | null,
    lpgInKwh: number | null,
    electricityInKwh: number | null,
    calculationMonth:string | null,
    calculationYear:string | null
}