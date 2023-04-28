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

const HotelRoomDetailsModal = ({ data, open, handleClose }: any) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='md'>
        <DialogTitle
          className='
            bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold 
          '>
          {data.titleEN}
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
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #e0e0e0',
                    }}>
                    <Typography variant='h5' gutterBottom>
                      {data.typeEN}
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                      {data.priceEN} € per unit
                    </Typography>
                  </Box>
                  <Typography
                    variant='body1'
                    gutterBottom
                    className='
                    text-gray-900 text-justify
                  '>
                    {data.descriptionEN}
                  </Typography>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Capacity:
                    </Typography>
                    <Typography variant='body1'>
                      {data.capacityEN}{' '}
                      {data.capacityEN > 1 ? 'people' : 'person'}
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Price ID:
                    </Typography>
                    <Typography variant='body1'>{data.priceId}</Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Breakfast:
                    </Typography>
                    <Typography variant='body1'>
                      {data.breakfastEN ? 'Included' : 'Not included'}
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Bathtub:
                    </Typography>
                    <Typography variant='body1'>
                      {data.bathtubEN ? 'Included' : 'Not included'}
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography variant='h6' gutterBottom>
                      Pets:
                    </Typography>
                    <Typography variant='body1'>
                      {data.petsEN ? 'Allowed' : 'Not allowed'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
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
                      src={data.thumbnailEN}
                      alt=''
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '320px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box
                    height='50%'
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='center'
                    alignItems='center'
                    overflow='auto'>
                    {data.imagesEN.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt=''
                        style={{
                          width: 'calc(50% - 8px)',
                          height: 'calc(33.33% - 8px)',
                          maxHeight: 'calc(33.33% - 70px)',
                          minHeight: '80px',
                          objectFit: 'cover',
                          margin: '4px',
                        }}
                      />
                    ))}
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

export default HotelRoomDetailsModal;
