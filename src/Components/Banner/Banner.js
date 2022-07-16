import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Carousel from './Carousel';

const useStyles = makeStyles({
    banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    BannerContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: 400,
        paddingTop: 25,

    },

    tagline: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "centere",
        alignItems: "Center",
        height:"40%",

    },
});


const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.BannerContent}>
                <div className={classes.tagline}>
                    <Typography variant='h2' style={{
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        marginBottom: 15,
                        fontSize:"3rem",
                    }}>
                        Crypto Tracker
                    </Typography>
                    <Typography variant='subtitle2' style={{
                        color: "darkgrey",
                        fontFamily: "Montserrat",
                        textTransform: "capitalize",
                    }}>
                        Check the latest rates before you buy. 
                    </Typography>

                </div>

                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner
