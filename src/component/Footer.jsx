import { Link, Typography } from '@mui/material';
import React from 'react'

const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} marginTop="20px">
      {'Copyright © '}
      <Link color="inherit" href="https://shanudey.github.io">
        Task Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer