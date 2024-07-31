import { Box, Grid } from "@mui/material"

function Month() {

  const cells = Array.from({ length: 35 }, (_, index) => index + 1) 

  return (
    <>
      <Box id="hide-scroll" >
        <Grid container sx={{display: "flex",
          overflow: "auto",
          width: 900,
          height: "90vh",
          position: "relative", boxShadow: "0 0 0 0.10px #656464"}}>

        { cells.map((cell) => (
          <Grid item xs={12 / 7} sx={{height:"20%", boxShadow: "0 0 0 0.10px #656464"}} key={cell}>

            <Box key={cell} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              {cell}
            </Box>
          </Grid>
          ))
        }
        </Grid>
      </Box>
    </>
  )
}

export default Month
