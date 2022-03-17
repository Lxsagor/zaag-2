import {
    Container,
    Grid,
    Box,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
}));
const Welcome = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        country: "",
    });

    const [info, setInfo] = useState([]);
    const classes = useStyles();
    const fieldChangeHandler = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        await fetch(`https://restcountries.com/v3.1/name/${formData.country}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 404) {
                    toast.error(res.message);
                } else {
                    // toast.success(res.message);
                    // console.log(res);
                    localStorage.setItem("data", JSON.stringify(res));
                    setInfo(res);
                    history("/info");
                }
            });
        setFormData({
            country: "",
        });

        // let data = JSON.parse(localStorage.getItem("data"));
    };

    console.log(info);
    return (
        <>
            <Container maxWidth="sm">
                <Box className={classes.root}>
                    <Typography variant="h4" mb={3}>
                        Type Country To Get Weather Info
                    </Typography>
                    <TextField
                        placeholder="Type country"
                        value={formData.country}
                        onChange={(e) =>
                            fieldChangeHandler("country", e.target.value)
                        }
                    />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={submitHandler}
                        sx={{
                            marginTop: "10px",
                            textTransform: "capitalize",
                            borderRadius: "10px",
                        }}
                        {...(!formData.country && {
                            disabled: true,
                        })}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Welcome;
