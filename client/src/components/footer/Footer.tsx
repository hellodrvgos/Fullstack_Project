import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import Stack from '@mui/material/Stack';

export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1, height: "250px", backgroundColor: "black", color: "white", mt: "100px" }}>
        <Grid container spacing={2} sx={{textAlign: "left", pt: "30px", pb: 3, bgcolor: "black"}}>
          <Grid item xs={3}>
            <Box sx={{textAlign: "center"}}>
                <PetsIcon sx={{fontSize: "170px", opacity: "0.8"}}/>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Stack direction="column" spacing={1} >
              <Typography variant='h6'>Our Store</Typography>
              <Typography variant='body1'>1017 XD Amsterdam</Typography>
              <Typography variant='body1'>Weteringschans 165 C</Typography>
              <Typography variant='body1'>+31 20 000 1122</Typography>
              <Typography variant='body1'>shop@besties.nl</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={3}>
          <Box>
              <Stack direction="column" spacing={1}>
              <Typography variant='h6'>Opening Hours</Typography>
              <Typography variant='body1'>Mon - Fri: 10am - 8pm</Typography>
              <Typography variant='body1'>Sat: 10am - 4pm​​</Typography>
              <Typography variant='body1'>Sun: 10am - 6pm</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={3}>
          <Box>
              <Stack direction="column" spacing={1}>
              <Typography variant='h6'>Credits</Typography>
              <Typography variant='body1'>Images & Videos by:</Typography>
              <Typography variant='body1'>PURINA.COM</Typography>
              <Typography variant='body1'>ENVATO.COM</Typography>
              <Typography variant='body1'>ICONS-ICONS.COM</Typography>
              <Typography variant='body1'>WIKIMEDIA.ORG</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
}