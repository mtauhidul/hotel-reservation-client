import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import DescriptionIcon from '@mui/icons-material/Description';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { loadStripe } from '@stripe/stripe-js';
import dayjs, { Dayjs } from 'dayjs';
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import Layout from '../../layout';
import { getBooking, getRoom } from '../../services';
import styles from './Room.module.scss';

interface Room {
  titleEN: string;
  descriptionEN: string;
  priceEN: string;
  breakfastEN: boolean;
  capacityEN: string;
  bathtubEN: boolean;
  typeEN: string;
  petsEN: boolean;
  imagesEN: string[];
  thumbnailEN: string;
  titleFR: string;
  descriptionFR: string;
  id?: any;
  status: string;
  priceId: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Room = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();

  const getRoomData = async () => {
    const room = await getRoom(String(id));
    return room;
  };

  const { data: room, error, isLoading } = useSWR('room', getRoomData);

  const base_url =
    import.meta.env.VITE_NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://hotel-reservation-server.herokuapp.com';

  const handleCheckout = async (room: any) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;

      const data = {
        ...room,
        checkIn: startDate?.format('YYYY-MM-DD'),
        checkOut: endDate?.format('YYYY-MM-DD'),
        guests: quantity,
      };

      const res = await fetch(`${base_url}/create-checkout-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const checkoutSession = await res.json();

      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (result?.error?.message) {
        toast.error(result.error.message);
      } else {
        toast.success('Reservation successful');
        sessionStorage.clear();

        const booking = await getBooking(checkoutSession.id);

        if (booking?.name) {
          emailjs
            .send(
              import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_CONFIRMATION_EMAILJS_TEMPLATE_ID,
              {
                name: booking.name,
                email: booking.email,
                room: booking.room,
                type: booking.type,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guest: booking.guest,
                bookingDate: new Date().toLocaleDateString(),
                bookingId: booking.id,
              },
              import.meta.env.VITE_PUBLIC_EMAILJS_USER_ID
            )
            .then((result) => {
              console.log(result.text);
            });
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: Room.tsx:129 ~ handleCheckout ~ error:', error);
      setLoading(false);
    }
  };

  // const bookingHandler = (room: any) => {
  //   sessionStorage.setItem(`${room?.id}`, JSON.stringify(room));
  //   navigate(`/payment/${room?.id}`);
  // };

  // const [room, setRoom] = useState<Room>();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState<boolean>(false);
  // quantity
  const [quantity, setQuantity] = useState<string>('1');

  console.log(quantity);
  // total
  const [total, setTotal] = useState<number>(Number(room?.priceEN));

  // set startDate and endDate from url search params
  const checkInDate = searchParams.get('checkIn');
  const checkOutDate = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setStartDate(dayjs(checkInDate));
      setEndDate(dayjs(checkOutDate));
      // setQuantity(guests || '1');
    }
  }, []);

  useEffect(() => {
    setTotal(Number(room?.priceEN) * Number(quantity));
  }, [id, room]);

  useEffect(() => {
    // get total using reduce price and quantity
    const result = Number(room?.priceEN) * Number(quantity);
    setTotal(result);
  }, [quantity]);

  // useEffect(() => {
  //   async function fetchRooms() {
  //     const roomList = await getRoom(String(id));
  //     setRoom(roomList);
  //   }

  //   fetchRooms();
  // }, []);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value as string);
  };

  const description =
    language === 'en' ? room?.descriptionEN : room?.descriptionFR;

  const title = language === 'en' ? room?.titleEN : room?.titleFR;

  return (
    <Layout>
      <div className={styles._wrapper}>
        <Container>
          <Typography variant='h6' color='inherit' className={styles._title}>
            {title}
          </Typography>

          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            spacing={2}
            className={styles._layout}>
            <Stack direction='column' spacing={2}>
              <Stack direction='row' spacing={2}>
                <div>
                  <img
                    src={room?.imagesEN[0]}
                    alt={room?.titleEN}
                    className={styles._small_image}
                  />
                </div>
                <div>
                  <img
                    src={room?.imagesEN[1]}
                    alt={room?.titleEN}
                    className={styles._small_image}
                  />
                </div>
              </Stack>
              <Box>
                <div>
                  <img
                    src={room?.imagesEN[2]}
                    alt={room?.titleEN}
                    className={styles._big_image}
                  />
                </div>
              </Box>
            </Stack>
            <Stack direction='column' spacing={2}>
              <Box>
                <div>
                  <img
                    src={room?.imagesEN[2]}
                    alt={room?.titleEN}
                    className={styles._big_image}
                  />
                </div>
              </Box>
              <Stack direction='row' spacing={2}>
                <div>
                  <img
                    src={room?.imagesEN[0]}
                    alt={room?.titleEN}
                    className={styles._small_image}
                  />
                </div>
                <div>
                  <img
                    src={room?.imagesEN[1]}
                    alt={room?.titleEN}
                    className={styles._small_image}
                  />
                </div>
              </Stack>
            </Stack>
          </Stack>

          <Box className={styles._description}>
            <Card className={styles._card}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                <DescriptionIcon
                  sx={{ color: '#dfbf7b', margin: '0 auto', fontSize: '60px' }}
                />
              </Box>
              <Typography
                variant='h6'
                color='inherit'
                className={styles._title}>
                {t('room_description')}
              </Typography>
              <Typography
                variant='body1'
                color='inherit'
                sx={{
                  textAlign: 'justify !important',
                }}
                className={styles._body}>
                {show ? description : description?.slice(0, 590)}
              </Typography>

              <Stack
                onClick={() => setShow(!show)}
                direction={'column'}
                spacing={2}
                sx={{ marginTop: '20px', cursor: 'pointer' }}>
                <Typography
                  variant='h6'
                  color='inherit'
                  className={styles._body}>
                  {show ? t('showLess') : t('showMore')}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    marginTop: '0px !important',
                  }}>
                  {show ? (
                    <KeyboardArrowUpIcon
                      sx={{
                        color: '#dfbf7b',
                        margin: '0 auto',
                        fontSize: '60px',
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      sx={{
                        color: '#dfbf7b',
                        margin: '0 auto',
                        fontSize: '60px',
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </Card>
          </Box>

          <Grid container spacing={3} className={styles._more_details}>
            {room?.breakfastEN && (
              <Grid item md={6} sm={12} xs={12}>
                <Card className={styles._card}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}>
                    <Stack direction='row' spacing={1} alignItems={'center'}>
                      <FreeBreakfastIcon />
                      <Typography variant='h6' color='inherit'>
                        {t('breakfast')}
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack
                    direction='row'
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Stack direction='row' spacing={1} alignItems={'center'}>
                      <BedIcon />
                      <Typography variant='h6' color='inherit'>
                        {room?.capacityEN} {t('beds')}
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems={'center'}>
                      <BathtubIcon />
                      <Typography variant='h6' color='inherit'>
                        {room?.typeEN}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>

                <br />
                <br />
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.881967092916!2d0.704333177034073!3d48.82231347132734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e179d91c81c419%3A0x3d94cc8691023466!2sLe%20Clos%20Saint-Germain!5e0!3m2!1sen!2sbd!4v1682193076948!5m2!1sen!2sbd'
                  width='100%'
                  height='300px'
                  //   allowfullscreen=""
                  loading='lazy'
                  style={{ borderRadius: '48px' }}
                  //   referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Grid>
            )}
            <Grid item md={6} sm={12} xs={12}>
              <Card className={styles._card}>
                <Typography variant='h6' color='inherit'>
                  {room?.priceEN}€{' '}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                    }}>
                    {t('perUnit')}
                  </span>
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack
                    direction='row'
                    spacing={1}
                    alignItems={'center'}
                    sx={{ marginTop: '20px' }}>
                    <DatePicker
                      label='Start Date'
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      disablePast={true}
                    />
                    <DatePicker
                      label='End Date'
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      disablePast={true}
                    />
                  </Stack>
                </LocalizationProvider>

                <FormControl fullWidth sx={{ marginTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    {t('guests')}
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={quantity}
                    label={t('guests')}
                    onChange={handleQuantityChange}>
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'6'}>6</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  onClick={() => handleCheckout(room)}
                  variant='contained'
                  color='inherit'
                  className={styles._button}>
                  {loading ? <CircularProgress /> : t('bookNow')}
                </Button>

                <Typography
                  variant='h6'
                  color='inherit'
                  className={styles._subtitle}>
                  {t('condition')}
                </Typography>

                <Stack
                  direction='row'
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Typography
                    sx={{
                      textDecoration: 'underline',
                    }}
                    variant='body1'
                    color='inherit'
                    className={styles._subtitle}>
                    {room?.priceEN} € * {quantity} {t('unit')}
                  </Typography>

                  <Typography
                    variant='body1'
                    color='inherit'
                    className={styles._subtitle}>
                    {total} €
                  </Typography>
                </Stack>

                {room?.breakfastEN && (
                  <Typography
                    variant='h6'
                    color='inherit'
                    sx={{
                      textAlign: 'left',
                      fontSize: '18px',
                      marginTop: '10px',
                      textDecoration: 'underline',
                      // color: "red",
                    }}>
                    {t('extra')}
                  </Typography>
                )}

                <div className={styles._divider}></div>

                <Stack
                  direction='row'
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Typography
                    variant='body1'
                    color='inherit'
                    className={styles._subtitle}
                    style={{ fontWeight: 'bold' }}>
                    {t('total')}
                  </Typography>

                  <Typography
                    variant='body1'
                    color='inherit'
                    className={styles._subtitle}>
                    {total} €
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* <Contact />
      <Socials /> */}
    </Layout>
  );
};

export default Room;
