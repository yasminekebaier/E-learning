import { AppBar, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
        <AppBar
        position="fixed"
        sx={{
          background: 'white',
          
          px: 2,
        }}
      >
        <Link to={"/register"}><Button> Se Connecter</Button></Link>
        </AppBar>   

    </>
  )
}

export default Home