import {List, ListItem, Typography,Container,Box, Paper} from "@mui/material";
import React from "react";

export default function TipsAndSuggestions(){
    return(
        <Container component={Paper} >

            <Typography color='secondary' fontWeight={600} align='center' letterSpacing={2} variant="h5" marginTop={2} >
                WHAT YOU CAN DO TO LIMIT YOUR CARBON FOOTPRINT
            </Typography>
            {/*<Typography color='secondary' align='center' letterSpacing={2} variant="h6" marginTop={4}>*/}
            {/*    Lower Your Carbon Emissions Through Transportation Choices*/}
            {/*</Typography>*/}


            <Box
                component="span"
                sx={{
                    display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Try to use your bike or to walk to work instead of your car. Star with two times a week and gradually increase the times
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Consider purchasing a hybrid or electric vehicle
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Consider carpooling to work to cut your commute's impact.
                Commuting with someone can save over 2,000 pounds of GHG emissions yearly
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Try to fly less often. Opt for longer vacations and use alternative modes of transportation

            </Box>
          {/*  <Typography color='secondary' align='center' letterSpacing={2} variant="h6">*/}
          {/*Lower Your Carbon Emissions Through Food Consumption*/}
          {/*  </Typography>*/}
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >

                Reduce your meat consumption and incorporate more high-protein vegetables and specific grains into your diet.
                Animal farming consumes a higher amount of energy
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Opt for organic, locally-sourced, and seasonal foods.
                The process of planting and growing food requires energy,
                with additional energy needed for transportation, processing, and distribution
            </Box>
            <Box
            component="span"
            sx={{
            display: 'block',
                p: 1,
                m: 1,
                border: '1px solid',
                //borderColor: 'white',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '600',
                bgcolor:'secondary.main',
                color: 'whitesmoke',
                textAlign: 'center',
            }}
            >Minimize food waste by purchasing only what you need. Discarding excess food
                not only wastes the item but also  the resources invested in its production,
                processing, and transportation
        </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Opt for alternatives to plastic food packaging, as single-use plastics pose a significant threat
                to the environment. Their production consumes considerable amounts of fossil fuels
            </Box>
            {/*<Typography color='secondary' align='center' letterSpacing={2} variant="h6">*/}
            {/*    How to save energy*/}
            {/*</Typography>*/}
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Insulate your home, around a third of a heat lost from an uninsulated home ascape through the walls
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Upgrade to modern, energy-efficient appliances and electronics,
                which are significantly more efficient than models from just a decade ago
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Switch your bulbs with modern LED bulbs that consume 80-90% less energy compared to traditional
                incandescent bulbs, reducing both your carbon emissions and electricity costs
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Disconnect electronics like chargers, TVs, and computers when they're not being used to conserve energy

            </Box>
            {/*<Typography color='secondary' align='center' letterSpacing={2} variant="h6">*/}
            {/*    How to save energy*/}
            {/*</Typography>*/}
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Opt for secondhand items, ranging from clothing to cars, rather than purchasing new ones
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Hold onto your mobile phone longer, aiming to replace it at least 6 months later than you typically would
            </Box>
            <Box
                component="span"
                sx={{
                display: 'block',
                    p: 1,
                    m: 1,
                    border: '1px solid',
                    //borderColor: 'white',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    bgcolor:'secondary.main',
                    color: 'whitesmoke',
                    textAlign: 'center',
                }}
                >
                Purchase products made from recycled materials to support sustainability
            </Box>
        </Container>
    
   
        )

}