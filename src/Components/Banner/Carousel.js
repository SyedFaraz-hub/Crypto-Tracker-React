import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TrendingCoins } from "../../config/api"
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';



const useStyles = makeStyles({
    Carousel: {
        display: "flex",
        alignItems: "center",
        height: "50%"
    },
    carouselItem: {
        display: "flex",
        alignItems: "center",
        flexDirection:"column",
        cursor: "pointer",
        color: "white",
        textTransform:"uppercase"
    },

})

const Carousel = () => {
    const classes = useStyles();
    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([]);

    const fetchCoinTrending = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
        // console.log(data)
    }

    useEffect(() => {
        fetchCoinTrending()
        // eslint-disable-next-line
    }, [currency]);

    const responsive = {
        0: {
            items: 2,

        },
        512: {
            items: 4,

        },
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {

        const profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link to={`/`} className={classes.carouselItem}>
                <img src={coin.image} alt={coin.name} height="80" style={{
                    marginBottom: 10,
                }} />
                <span>{coin.symbol}
                &nbsp;
                <span style={{
                    color: profit > 0 ? "rgb(14, 203 , 129)" : "red",
                    fontWeight: 500,
                }}>
                {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                 {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
                  
            </Link>
        )
    })

    return (
        <div className={classes.Carousel}>
            <AliceCarousel mouseTracking infinite disableButtonsControls autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items} />
        </div>
    )
}

export default Carousel
