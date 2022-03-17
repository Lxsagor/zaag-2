import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const Country_info = () => {
    const [infos, setInfos] = useState({
        info: [],
        weather: {},
    });
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("data")) || null;
        if (data) {
            setInfos((prevState) => ({
                ...prevState,
                info: data,
            }));
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(
            `http://api.weatherstack.com/current?access_key=c38896a436dd67b86883943f6bd3aa32&query=${infos?.info?.map(
                (item, i) => item.capital
            )}`
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setInfos((prevState) => ({
                    ...prevState,
                    weather: { res },
                }));
            });
    };
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    jastifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography mb={2} variant="h3">
                    Country's Information
                    <Divider />
                </Typography>
                <Typography mb={2} variant="h4">
                    Capital:
                    <span>{infos?.info?.map((item, i) => item.capital)}</span>
                </Typography>
                <Typography mb={2} variant="h4">
                    Population:
                    {infos?.info?.map((item, i) => item.population)}
                </Typography>{" "}
                <Typography mb={2} variant="h4">
                    latlng:
                    {infos?.info?.map((item, i) =>
                        item.latlng.map((lat, j) => lat + ",")
                    )}
                </Typography>
                <Avatar
                    sx={{ borderRadius: "0", width: "120px", height: "90px" }}
                    alt="Flag"
                    src={infos?.info?.map((item, i) => item.flags.png)}
                />
                <Button
                    sx={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        textTransform: "capitalize",
                        borderRadius: "10px",
                    }}
                    disableElevation
                    size="large"
                    variant="contained"
                    onClick={submitHandler}
                >
                    Capital Weather
                </Button>
                {Object.keys(infos.weather).length > 0 && (
                    <>
                        <Typography mb={2} variant="h4">
                            Temperature:
                            <span>
                                {infos?.weather?.res?.current?.temperature}
                            </span>
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography mb={2} ml={2} variant="h4">
                                Weather flag:
                            </Typography>
                            <Avatar
                                sx={{
                                    borderRadius: "0",
                                    width: "120px",
                                    height: "90px",
                                }}
                                alt="Flag"
                                src={infos?.weather?.res?.current?.weather_icons?.map(
                                    (item, i) => item
                                )}
                            />
                        </Box>
                        <Typography mb={2} variant="h4">
                            Wind Speed:
                            <span>
                                {infos?.weather?.res?.current?.wind_speed}
                            </span>
                        </Typography>
                        <Typography mb={2} variant="h4">
                            precip:
                            <span>{infos?.weather?.res?.current?.precip}</span>
                        </Typography>
                    </>
                )}
            </Box>
        </>
    );
};

export default Country_info;
