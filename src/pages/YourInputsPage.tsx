import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form';
import {Box, Container, FormHelperText, Paper, TextField} from '@mui/material';
import {BaseSyntheticEvent, useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import agent from "../services/Agent";
import {UserInputsFromUIEnergy} from "../domain/userInputsFromUIEnergy";
import {UserInputsFromUITransport} from "../domain/userInputsFromUITransport";
import {UserInputsFromUIFood} from "../domain/userInputsFromUIFood";
import {UserInputsFromUIGoods} from "../domain/userInputsFromUIGoods";






interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
                )}
        </div>
        );
}



function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}




export default function YourInputsPage() {

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } }  = useForm({
        mode: 'onChange'
    })
    const [carSize, setCarSize] = React.useState('');
    const [fuelType, setFuelType] = React.useState('');
    const [seatclass, setSeatclass] = React.useState('');
    const [flightCategory, setFlightCategory] = React.useState('');
    const [railType, setRailType] = React.useState('');
    const [taxiType, setTaxiType] = React.useState('');
    const [motorbikeSize, setMotorbikeSize] = React.useState('');
    const [typeOfPassengerOnFerry, setTypeOfPassengerOnFerry] = React.useState('');
    const months = [
        {value:'1'},
        {value:'2'},
        {value:'3'},
        {value:'4'},
        {value:'5'},
        {value:'6'},
        {value:'7'},
        {value:'8'},
        {value:'9'},
        {value:'10'},
        {value:'11'},
        {value:'12'}
    ]

    const years = [
        {value:'2023'},
        {value:'2024'},
        {value:'2025'},
        {value:'2026'}
    ]

    
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    
    
    
    async function submitForm1(data: FieldValues) {
        const {burningOilInKwh, woodLogsInTonnes, propaneInKwh, naturalGasInKwh, lpgInKwh, electricityInKwh,calculationMonth, calculationYear} = data;
        
        
        let inputsFromUIEnergy:UserInputsFromUIEnergy = {
            user_id: parseInt(localStorage.getItem('user_id')!),
            burningOilInKwh: parseInt(burningOilInKwh)!,
            woodLogsInTonnes: parseInt(woodLogsInTonnes)!,
            propaneInKwh: parseInt(propaneInKwh)!,
            naturalGasInKwh: parseInt(naturalGasInKwh)!,
            lpgInKwh: parseInt(lpgInKwh)!,
            electricityInKwh: parseInt(electricityInKwh)!,
            calculationMonth:calculationMonth,
            calculationYear:calculationYear
        }
        console.log(inputsFromUIEnergy);
        await agent.genapi.sendUserInputsFromUIEnergy(inputsFromUIEnergy);
        console.log(inputsFromUIEnergy);
   
    }
        
    async function submitForm2(data: FieldValues) {
        const {travelledDistanceInMilesByBus,travelledDistanceInMilesByCar,
            travelledDistanceInMilesByFerry,travelledDistanceInMilesInFlight,
            travelledDistanceInMilesByMotorbike,travelledDistanceInMilesByRail,travelledDistanceInMilesByTaxi,calculationMonth,
            calculationYear} = data;
        
        console.log(data);
        let inputsFromUITransport:UserInputsFromUITransport = {
            user_id: parseInt(localStorage.getItem('user_id')!),
            travelledDistanceInMilesByBus:parseInt(travelledDistanceInMilesByBus)! ,
            carSize: carSize,
            fuelType: fuelType,
            travelledDistanceInMilesByCar: parseInt(travelledDistanceInMilesByCar)!,
            typeOfPassengerOnFerry: typeOfPassengerOnFerry,
            travelledDistanceInMilesByFerry: parseInt(travelledDistanceInMilesByFerry)!,
            seatclass: seatclass,
            flightCategory: flightCategory,
            travelledDistanceInMilesInFlight: parseInt(travelledDistanceInMilesInFlight)!,
            motorbikeSize: motorbikeSize,
            travelledDistanceInMilesByMotorbike: parseInt(travelledDistanceInMilesByMotorbike)!,
            railType: railType,
            travelledDistanceInMilesByRail: parseInt(travelledDistanceInMilesByRail)!,
            taxiType: taxiType,
            travelledDistanceInMilesByTaxi: parseInt(travelledDistanceInMilesByTaxi)!,
            calculationMonth:calculationMonth,
            calculationYear:calculationYear
            
        }
        console.log(inputsFromUITransport)
        await agent.genapi.sendUserInputsFromUITransport(inputsFromUITransport);
    }
    
    async function submitForm3(data: FieldValues) {
        const {preparedMeals,meat,oils,bread,fruit,fish,milk,calculationMonth,calculationYear} = data;
        
        console.log(data);
        let inputsFromUIFood:UserInputsFromUIFood = {
            user_id:parseInt( localStorage.getItem('user_id')!),
            preparedMeals:parseInt(preparedMeals)!,
            meat:parseInt(meat)!,
            oils:parseInt(oils)!,
            bread:parseInt(bread)!,
            fruit:parseInt(fruit)!,
            fish:parseInt(fish)!,
            milk:parseInt(milk)!,
            calculationMonth:calculationMonth,
            calculationYear:calculationYear
            
        }
        await agent.genapi.sendUserInputsFromUIFood(inputsFromUIFood);
    }
    
    async function submitForm4(data: FieldValues) {
        const {restaurants,hotels,pharmaceutical,repairElectricAppliances,
            electricAppliances,electronicalEquipment,education,hairdressing,books, sportEquipment, hobbies,hospital,medical,utensils,
            repairFurniture,furniture,footwear,clothingAccessories,clothes,calculationMonth,calculationYear} = data;
        
        console.log(data);
        let inputsFromUIGoods: UserInputsFromUIGoods = {
            user_id: parseInt(localStorage.getItem('user_id')!),
            restaurants:parseInt(restaurants)!,
            hotels:parseInt(hotels)!,
            pharmaceutical:parseInt(pharmaceutical)!,
            repairElectricAppliances:parseInt(repairElectricAppliances)!,
            electricAppliances:parseInt(electricAppliances)!,
            electronicalEquipment:parseInt(electronicalEquipment)!,
            education:parseInt(education)!,
            hairdressing:parseInt(hairdressing)!,
            books:parseInt(books)!,
            sportEquipment:parseInt(sportEquipment)!,
            hobbies:parseInt(hobbies)!,
            hospital:parseInt(hospital)!,
            medical:parseInt(medical)!,
            utensils:parseInt(utensils)!,
            repairFurniture:parseInt(repairFurniture)!,
            furniture:parseInt(furniture)!,
            footwear:parseInt(footwear)!,
            clothingAccessories:parseInt(clothingAccessories)!,
            clothes:parseInt(clothes)!,
            calculationMonth:calculationMonth,
            calculationYear:calculationYear
            
        }
        await agent.genapi.sendUserInputsFromUIGoods(inputsFromUIGoods);
        
    }
    
    
    const handleChangeCar = (event: SelectChangeEvent) => {
        setCarSize(event.target.value);
    };
    const handleChangeFuel = (event: SelectChangeEvent) => {
        setFuelType(event.target.value);
    };
    const handleChangeSeatClass = (event: SelectChangeEvent) => {
        setSeatclass(event.target.value);
    };
    const handleChangeFlightCategory = (event: SelectChangeEvent) => {
        setFlightCategory(event.target.value);
    };
    const handleChangeRailType = (event: SelectChangeEvent) => {
        setRailType(event.target.value);
    };
    const handleChangeTaxiType = (event: SelectChangeEvent) => {
        setTaxiType(event.target.value);
    };
    const handleChangeMotorbikeSize = (event: SelectChangeEvent) => {
        setMotorbikeSize(event.target.value);
    };
    const handleChangeFerryType = (event: SelectChangeEvent) => {
        setTypeOfPassengerOnFerry(event.target.value);
    };
   
    
    
        return (
            
            <Box sx={{ bgcolor: 'background.white', width: 1800 }}>
                
                <AppBar position="static" color="secondary" enableColorOnDark>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"

                        >
                        <Tab label="Home and Energy Consumption" {...a11yProps(0)} />
                        <Tab label="Transportation" {...a11yProps(1)} />
                        <Tab label="Food Consumption" {...a11yProps(2)} />
                        <Tab label="Goods and Services Consumption" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Container component={Paper} maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, marginTop: '6', width: '100%' }}>
                            <Typography color='secondary' align='center' letterSpacing={2} variant="h5">
                                WHAT IS YOUR ENERGY HOUSEHOLD CONSUMPTION?
                            </Typography>

                            <Box component="form" onSubmit={(handleSubmit(submitForm1))} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                               
                                <TextField
                                    id="outlined-select-month"
                                    color='secondary'
                                    select
                                    label="Reference month"
                                    defaultValue="January"
                                    helperText="Please select the month to which the consumption is referred"
                                    {...register('calculationMonth')}
                                    >
                                    {months.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>
                                
                                <TextField
                                    id="outlined-select-year"
                                    color='secondary'
                                    select
                                    label="Reference year"
                                    defaultValue="2024"
                                    helperText="Please select the year to which the consumption is referred"
                                    {...register('calculationYear')}
                                    >
                                    {years.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>

                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of electricity you used in the previous month? (measured in kwh)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('electricityInKwh')}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of LPG you used in the previous month? (measured in kwh)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('lpgInKwh')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of Natural gas you used in the previous month? (measured in kwh)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('naturalGasInKwh')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of Propane you used in the previous month? (measured in kwh)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('propaneInKwh')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of Burning oil you used in the previous month? (measured in kwh)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('burningOilInKwh')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What was the total amount of Wood logs you used in the previous month? (measured in tonnes) </Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('woodLogsInTonnes')}
                                    />
                                </Box>
                                <LoadingButton

                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    type="submit"
                                    variant="contained" color='secondary'
                                    sx={{display: 'flex', align: 'center', mt: 3, mb: 2}}
                                    >
                                    Submit 
                                </LoadingButton>
                            </Box>
                            <Typography color='#808080' align='left'  variant="h6">
                                To add a new record for a second house just make a new submission with the additional details
                            </Typography>
                        </Container>
                    </TabPanel>
                    
                    
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Container component={Paper} maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, marginTop: '6', width: '100%' }}>
                            <Typography color='secondary' align='center' letterSpacing={2} variant="h6">
                                WHAT ARE YOUR TRANSPORTATION HABBITS?
                            </Typography>
                                
                            <Box component="form" onSubmit={(handleSubmit(submitForm2))} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                <TextField
                                    id="outlined-select-month"
                                    color='secondary'
                                    select
                                    label="Reference month"
                                    defaultValue="January"
                                    helperText="Please select the month to which the consumption is referred"
                                    {...register('calculationMonth')}
                                    >
                                    {months.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>

                                <TextField
                                    id="outlined-select-year"
                                    color='secondary'
                                    select
                                    label="Reference year"
                                    defaultValue="2024"
                                    helperText="Please select the year to which the consumption is referred"
                                    {...register('calculationYear')}
                                    >
                                    {years.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>
                                
                                
                                <Box sx={{display:'flex', flexDirection: 'column', mt:2}}>
                                    <Box sx={{display:'flex', flexDirection: 'row', mt:2}}>
                                    <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                        Car transit
                                    </Typography>
                                    <FormControl variant="standard" sx={{ m: 4,flexDirection: 'column', minWidth: 120 }}>
                                        <InputLabel id="car-type-label">Car type</InputLabel>
                                        <Select
                                            labelId="car-type-label"
                                            id="car-type"
                                            value={carSize}
                                            onChange={handleChangeCar}
                                            label="carType"
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Average">Average(Unknown engine size)</MenuItem>
                                            <MenuItem value="Small Car">Small Car(Up to 1.7 litre engine)</MenuItem>
                                            <MenuItem value="Medium Car">Medium Car(From 1.7-2.0 litre engine)</MenuItem>
                                            <MenuItem value="Large Car">Large Car(Over 2.0 litre engine)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ m: 4, minWidth: 120 }}>
                                        <InputLabel id="fuel-type-label">Fuel type</InputLabel>
                                        <Select
                                            labelId="fuel-type-label"
                                            id="fuel-type"
                                            value={fuelType}
                                            onChange={handleChangeFuel}
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Diesel">Diesel</MenuItem>
                                            <MenuItem value="Petrol">Petrol</MenuItem>
                                            <MenuItem value="Hyprid">Hyprid</MenuItem>
                                            <MenuItem value="Plug-in Hybrid Electric Vehicle">Plug-in hybrid electric car</MenuItem>
                                            <MenuItem value="Hyprid">Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 5 }}>
                                        <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by your car in miles </Typography>
                                        <TextField
                                            color='secondary'
                                            fullWidth
                                            disabled={isSubmitting}
                                            size='small'
                                            {...register('travelledDistanceInMilesByCar')}
                                            
                                        />
                                    </Box>
                                    </Box>
                            
                                    <Box sx={{display:'flex', flexDirection: 'row', mt:2}}>
                                        <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                            Motorbike transit
                                        </Typography>
                                        <FormControl variant="standard" sx={{ m: 8, minWidth: 120 }}>
                                            <InputLabel id="motorbike-type-label">Motorbike type</InputLabel>
                                            <Select
                                                labelId="motorbike-type-label"
                                                id="motorbike-type"
                                                value={motorbikeSize}
                                                onChange={handleChangeMotorbikeSize}
                                                label="MotorbikeType"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="Small">Small(up to 125cc)</MenuItem>
                                                <MenuItem value="Medium">Medium(125-500cc)</MenuItem>
                                                <MenuItem value="Large">Large(over 500cc)</MenuItem>
                                                <MenuItem value="Average">Average(Unknown engine size)</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 10 }}>
                                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by your motorbike in miles  </Typography>
                                            <TextField
                                                color='secondary'
                                                fullWidth
                                                disabled={isSubmitting}
                                                size='small'
                                                {...register('travelledDistanceInMilesByMotorbike')}
                                            />
                                        </Box>
                                    </Box>
                            
                                    <Box sx={{display:'flex', flexDirection: 'row', mt:2}}> 
                                    <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                        Air travel
                                    </Typography>
                                            <FormControl variant="standard" sx={{ m: 6, minWidth: 120 }}>
                                                <InputLabel id="flight-class-label">Flight class</InputLabel>
                                                <Select
                                                    labelId="flight-class-label"
                                                    id="flight-class"
                                                    value={seatclass}
                                                    onChange={handleChangeSeatClass}
                                                    label="FlightClass"
                                                    >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="Average passenger"> Average passenger</MenuItem>
                                                    <MenuItem value="Economy class">Economy class</MenuItem>
                                                    <MenuItem value="Business class<">Business class</MenuItem>
                                                    <MenuItem value="First class">First class</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="standard" sx={{ m: 6, minWidth: 120 }}>
                                                <InputLabel id="light-range-label">Flight range</InputLabel>
                                                <Select
                                                    labelId="flight-range-label"
                                                    id="flight-range"
                                                    value={flightCategory}
                                                    onChange={handleChangeFlightCategory}
                                                    >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value="Domestic">Domestic(between UK airports)</MenuItem>
                                                    <MenuItem value="Short-haul">Short-haul (up to 2.299 mi)</MenuItem>
                                                    <MenuItem value="Long-haul">Long-haul (over 2.299 mi)</MenuItem>
                                                    <MenuItem value="International">International (from/to non UK)</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 8 }}>
                                                <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by airplane in km </Typography>
                                                <TextField
                                                    color='secondary'
                                                    fullWidth
                                                    disabled={isSubmitting}
                                                    size='small'
                                                    {...register('travelledDistanceInMilesInFlight')}
                                                />
                                       </Box>
                                    </Box>
                            
                                    <Box sx={{display:'flex', flexDirection: 'row', mt:2}}>
                                        <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                            Ferry travel
                                        </Typography>
                                        <FormControl variant="standard" sx={{ m: 8, minWidth: 120 }}>
                                            <InputLabel id="ferry-type-label">Ferry type</InputLabel>
                                            <Select
                                                labelId="ferry-type-label"
                                                id="ferry-type"
                                                value={typeOfPassengerOnFerry}
                                                onChange={handleChangeFerryType}
                                                label="FerryType"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="Foot Passenger">Passenger only</MenuItem>
                                                <MenuItem value="Car passenger">Passenger&car</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 10 }}>
                                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by ferry in km  </Typography>
                                            <TextField
                                                color='secondary'
                                                fullWidth
                                                disabled={isSubmitting}
                                                size='small'
                                                {...register('travelledDistanceInMilesByFerry')}
                                            />
                                        </Box>
                                    </Box>
                            
                                    <Box sx={{display:'flex', flexDirection: 'row', mt:2}}>
                                        <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                            Travel by train
                                        </Typography>
                                        <FormControl variant="standard" sx={{ m: 6, minWidth: 120 }}>
                                            <InputLabel id="rail-type-label">Rail type</InputLabel>
                                            <Select
                                                labelId="rail-type-label"
                                                id="rail-type"
                                                value={railType}
                                                onChange={handleChangeRailType}
                                                label="RailType"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="International rail"> International rail</MenuItem>
                                                <MenuItem value="National rail">National rail</MenuItem>
                                                <MenuItem value="Tram">Tram</MenuItem>
                                                <MenuItem value="London undeground">London undeground</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 8   }}>
                                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by train in km </Typography>
                                            <TextField
                                                color='secondary'
                                                fullWidth
                                                disabled={isSubmitting}
                                                size='small'
                                                {...register('travelledDistanceInMilesByRail')}
                                            />
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'row', mt:2 }}>
                                        <Typography color='#808080' align='left' fontWeight='bold' variant="h6">
                                            Travel by Taxi
                                        </Typography>
                                        <FormControl variant="standard" sx={{ m: 6, minWidth: 120 }}>
                                            <InputLabel id="taxi-type-label">Taxi type</InputLabel>
                                                <Select
                                                        labelId="taxi-type-label"
                                                        id="taxi-type"
                                                        value={taxiType}
                                                        onChange={handleChangeTaxiType}
                                                        label="TaxiType"
                                                        >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                    <MenuItem value="Regular Taxi"> Regular Taxi</MenuItem>
                                                    <MenuItem value="Black Cab">Black Cab</MenuItem>
                                                </Select>
                                        </FormControl>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 8   }}>
                                                <Typography color='#808080' ml={4} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by taxi in miles </Typography>
                                                <TextField
                                                    color='secondary'
                                                    fullWidth
                                                    disabled={isSubmitting}
                                                    size='small'
                                                    {...register('travelledDistanceInMilesByTaxi')}
                                                />
                                        </Box>
                                    </Box>

                                    <Box sx={{display:'flex', flexDirection: 'column', mt:2}}>
                                        <Typography color='#808080' fontWeight='bold' variant="h6">
                                            Travel by Bus
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
                                            <Typography color='#808080' ml={17} letterSpacing={1} fontWeight='bold' variant='body2'>Please enter the total distance you travelled by bus in km </Typography>
                                            <TextField
                                                color='secondary'
                                                fullWidth
                                                disabled={isSubmitting}
                                                size='small'
                                                {...register('travelledDistanceInMilesByBus')}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <LoadingButton
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    type="submit"
                                    variant="contained" color='secondary'
                                    sx={{display: 'flex', align: 'center', mt: 3, mb: 2,  width: '35%'}}
                                    >
                                    Submit 
                                </LoadingButton>
                            </Box>
                        </Container>
                    </TabPanel>
                    
                    
                    
                    
                    <TabPanel value={value} index={2} dir={theme.direction}>

                        <Container component={Paper} maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, marginTop: '6', width: '100%' }}>
                            <Typography color='secondary' align='center' letterSpacing={2} variant="h5">
                                WHAT IS YOUR FOOD CONSUMPTION?
                            </Typography>
                            <Box component="form" onSubmit={(handleSubmit(submitForm3))} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                <TextField
                                    id="outlined-select-month"
                                    color='secondary'
                                    select
                                    label="Reference month"
                                    defaultValue="January"
                                    helperText="Please select the month to which the consumption is referred"
                                    {...register('calculationMonth')}
                                    >
                                    {months.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>

                                <TextField
                                    id="outlined-select-year"
                                    color='secondary'
                                    select
                                    label="Reference year"
                                    defaultValue="2024"
                                    helperText="Please select the year to which the consumption is referred"
                                    {...register('calculationYear')}
                                    >
                                    {years.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>
                                
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on meat?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('meat')}
                                        
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on fish and seafood?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('fish')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on fruits and vegetables?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('fruit')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on bread and cereals?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('bread')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on milk, cheese and eggs?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('milk')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on oils and fats?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('oils')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on food products n.e.c, like prepared meals,chocolate, honey, and confectionary?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('preparedMeals')}
                                    />
                                </Box>
                                <LoadingButton
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained" color='secondary'
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Submit
                                </LoadingButton>
                            </Box>
                        </Container>
                    </TabPanel>
                    
                    
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Container component={Paper} maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, marginTop: '6', width: '100%' }}>
                            <Typography color='secondary' align='center' letterSpacing={2} variant="h5">
                                WHAT IS YOUR SHOPPING BEHAVIOR?
                            </Typography>
                            <Box component="form" onSubmit={(handleSubmit(submitForm4))} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                <TextField
                                    id="outlined-select-month"
                                    color='secondary'
                                    select
                                    label="Reference month"
                                    defaultValue="January"
                                    helperText="Please select the month to which the consumption is referred"
                                    {...register('calculationMonth')}
                                    >
                                    {months.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>

                                <TextField
                                    id="outlined-select-year"
                                    color='secondary'
                                    select
                                    label="Reference year"
                                    defaultValue="2024"
                                    helperText="Please select the year to which the consumption is referred"
                                    {...register('calculationYear')}
                                    >
                                    {years.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                        ))}
                                </TextField>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on buying clothes?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('clothes')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on clothing accessories?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('clothingAccessories')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on shoes and footwear?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('footwear')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on furniture and furnishing?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('furniture')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on repairing furniture and furnishing?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('repairFurniture')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on buying electric household appliances?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('electricAppliances')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on repairing electric household appliances?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('repairElectricAppliances')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on buying household utensils,glassware e.t.c?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('utensils')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on pharmaceutical and medical products?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('pharmaceutical')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on medical and dental services?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('medical')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on hospital services?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('hospital')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on games,toys and hobbies?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('hobbies')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on electronical equipment, like a pc or mobile?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('electronicalEquipment')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on sport equipment?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('sportEquipment')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on books and newspapers?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('books')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on hotels and accomodation?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('hotels')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on restaurants and cafes?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('restaurants')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>How much money did you spend on hairdressing salons and personal grooming services?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('hairdressing')}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                    <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>What were your expenses on education?(in pounds)</Typography>
                                    <TextField
                                        color='secondary'
                                        fullWidth
                                        disabled={isSubmitting}
                                        size='small'
                                        {...register('education')}
                                    />
                                </Box>
                                <LoadingButton
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained" color='secondary'
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Submit
                                </LoadingButton>
                            </Box>
                        </Container>
                    </TabPanel>
                </SwipeableViews>
            </Box>
            );
    }

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}



