import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Location from "../../components/Rooms/Location";
import Search from "../../components/common/Forms/Search";
import Layout from "../../layout";
import { getRoom, getRooms } from "../../services";
import styles from "./Rooms.module.scss";
// import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const Rooms = () => {
  const [searchParams] = useSearchParams();
  // const [rooms, setRooms] = useState<any>([]);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [imgLoaded, setImgLoaded] = useState(true);

  console.log(
    "🚀 ~ file: Rooms.tsx:58 ~ Rooms ~ searchParams:",
    "checkIn",
    searchParams.get("checkIn"),
    "checkOut",
    searchParams.get("checkOut"),
    "guests",
    searchParams.get("guests")
  );

  const getRoomData = async () => {
    const roomsList = await getRooms();
    return roomsList;
  };

  const { data: rooms, error, isLoading } = useSWR("rooms", getRoomData);

  if (error)
    return <div className="text-red-700 text-center my-5">failed to load</div>;

  return (
    <Layout>
      <Container>
        <Box className={styles._header}>
          {/* <Typography variant="h6" color="inherit" className={styles._title}>
            SOYEZ LES BIENVENUS !
          </Typography> */}
          <Search />
        </Box>

        <Grid container spacing={4} className={styles._rooms}>
          {isLoading &&
            new Array(6).fill(0).map((_, index) => (
              <Grid item md={6} sm={6} xs={12}>
                <div className="bg-gray-300 animate-pulse w-full h-96 rounded-[40px]"></div>
              </Grid>
            ))}

          {rooms?.length &&
            !isLoading &&
            !error &&
            (rooms as Array<any>).length &&
            rooms?.map((room: any) => {
              const title = language === "en" ? room?.titleEN : room?.titleFR;

              return (
                <Grid item md={6} sm={6} xs={12} className={styles._room}>
                  <Link
                    to={`/room/${room.id}?checkIn=${searchParams.get(
                      "checkIn"
                    )}&checkOut=${searchParams.get(
                      "checkOut"
                    )}&guests=${searchParams.get("guests")}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card className={styles._card}>
                      <Box className={styles._card_header}>
                        <Typography
                          variant="h6"
                          color="inherit"
                          className={styles._title}
                        >
                          {title}
                        </Typography>
                      </Box>
                      <Box
                        className={styles._body}
                        sx={{
                          position: "relative",
                        }}
                      >
                        <img
                          src={room?.imagesEN[0]}
                          alt={room.titleEN}
                          onLoad={() => setImgLoaded(false)}
                        />

                        {imgLoaded && (
                          <div className="bg-gray-300 absolute top-0 left-0 animate-pulse w-full h-[300px]" />
                        )}
                      </Box>

                      {/* hover text section */}
                      <Box className={styles._hover_text}>
                        <Typography
                          variant="h6"
                          color="inherit"
                          className={styles._title}
                        >
                          {room?.priceEN}€ / {t("room_card_unit")}
                        </Typography>
                      </Box>

                      {/* hover button section */}
                      <Box className={styles._hover_button}>
                        <Typography
                          variant="h6"
                          color="inherit"
                          className={styles._title}
                        >
                          {t("room_card_show")}
                        </Typography>
                        <KeyboardArrowDownIcon />
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
        </Grid>

        {/* location section is here */}
        <Location />
      </Container>
    </Layout>
  );
};

export default Rooms;
