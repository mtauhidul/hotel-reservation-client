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

const PageDetailsModal = ({ data, open, handleClose }: any) => {
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
                  <Typography variant='h5' gutterBottom>
                    EN: {data.titleEN}
                  </Typography>
                  <hr />
                  <Typography variant='h5' gutterBottom>
                    FR: {data.titleFR}
                  </Typography>
                </Box>
                <Box height='100%'>
                  <Box
                    sx={{
                      marginTop: '2rem',
                    }}
                    height='auto'
                    bgcolor='grey.200'
                    borderRadius='borderRadius'
                    overflow='hidden'>
                    <img
                      src={data.image}
                      alt=''
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '320px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Box>
                <Typography
                  variant='body1'
                  gutterBottom
                  className='
                    text-gray-900 text-justify
                  '>
                  <span
                    style={{
                      fontWeight: 'bold',
                    }}>
                    DESCRIPTION EN:
                  </span>{' '}
                  {data.descriptionEN}
                </Typography>
                <br />
                <hr />
                <br />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                height='100%'
                display='flex'
                flexDirection='column'
                justifyContent='space-between'>
                <Typography
                  variant='body1'
                  gutterBottom
                  className='
                    text-gray-900 text-justify
                  '>
                  <span
                    style={{
                      fontWeight: 'bold',
                    }}>
                    DESCRIPTION FR:
                  </span>{' '}
                  {data.descriptionFR}
                </Typography>
              </Box>
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

export default PageDetailsModal;
