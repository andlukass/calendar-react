import { Box } from "@mui/material"

function Month() {

  return (
    <>
      <Box id="hide-scroll" sx={{display: "flex", overflow: "auto", width: 900, height: "90vh", position: "relative", border: "1px solid"}}>
        <p>Month Mode</p>
      </Box>
    </>
  )
}

export default Month
