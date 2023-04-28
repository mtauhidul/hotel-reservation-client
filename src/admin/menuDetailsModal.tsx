import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

const MenuDetailsModal = ({ data, open, handleClose }: any) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='md'>
        <DialogTitle
          className='
              bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold 
            '>
          {data.id}
        </DialogTitle>
        <DialogContent>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='80vh'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <br />
                <Box
                  height='100%'
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #e0e0e0',
                    }}>
                    <Typography variant='h6' gutterBottom>
                      {data.status === true ? 'Active' : 'Not active'}
                    </Typography>
                  </Box>
                  <Typography variant='h6' gutterBottom>
                    Principal:
                  </Typography>
                  <Typography
                    variant='body1'
                    gutterBottom
                    className='
                      text-gray-900 text-justify
                    '>
                    {data.platPrincipalEN}
                  </Typography>
                  <Typography
                    variant='body1'
                    gutterBottom
                    className='
                      text-gray-900 text-justify
                    '>
                    {data.platPrincipalFR}
                  </Typography>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Dessert:
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className='
                      text-gray-900 text-justify
                    '>
                      {data.dessertEN}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className='
                      text-gray-900 text-justify
                    '>
                      {data.dessertFR}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuDetailsModal;
