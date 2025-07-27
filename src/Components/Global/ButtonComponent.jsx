import { Button } from '@mui/material'


const ButtonComponent = ({ onClick ,text,icon,color = 'primary' }) => {
  return (
   <Button variant="contained"  type='submit' onClick={onClick} startIcon={icon} sx={{
    borderRadius: 2,
    textTransform: 'none',
    px: 3,    bgcolor: color,
        '&:hover': {
          bgcolor: color,
          opacity: 0.9
        }   }}>
    {text}
   </Button>
  )
}
export { ButtonComponent};