import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Pagination } from '@material-ui/lab';




const useStyles = makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold"
        },
    },
});



const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    }
})



const CoinPage = () => {
    const [coins, setCoin] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol } = CryptoState();
    const history = useHistory();
    const classes = useStyles();



    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        // console.log(data)
        setCoin(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line
    }, [currency]);


    const handleSearch = () => {
        return (
            coins.filter((coin) => {
                return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
            })
        )
    }


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{
                textAlign: "center",
            }}>
                <Typography variant='h4' style={{
                    margin: 18,
                    fontFamily: "Montserrat"
                }}>
                    Cryptocurrency by Market Cap
                </Typography>


                <TextField onChange={(e) => { setSearch(e.target.value) }} variant='outlined' label="Search For a Crypto Currency.." style={{
                    width: "100%",
                    marginBottom: 20,

                }}>

                </TextField>

                <TableContainer>
                    {
                        loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) : (
                            <>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                        <TableRow>
                                            {
                                                ["Coin", "Price", "24h Change", "Market Cap"].map((heading) => {
                                                    return <TableCell align={heading === "Coin" ? "" : "right"} style={{ color: "black", fontSize: "700", fontWeight: "bold", fontFamily: "Montserrat" }} key={heading}>
                                                        {heading}
                                                    </TableCell>
                                                })
                                            }

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((filterCoin) => {

                                            const profit = filterCoin.price_change_percentage_24h > 0

                                            return (
                                                <TableRow key={filterCoin.name} className={classes.row} onClick={() => { history.push(`/`) }}>

                                                    <TableCell component="th" scope='row' style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}>
                                                        <img src={filterCoin.image} alt={filterCoin.name} height="50" style={{ marginBottom: 10 }} />

                                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                                            <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                                                                {filterCoin.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>
                                                                {filterCoin.name}
                                                            </span>
                                                        </div>

                                                    </TableCell  >

                                                    <TableCell align="right">
                                                        {symbol} {" "} {numberWithCommas(filterCoin.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <span style={{
                                                            color: profit > 0 ? "rgb(14, 203 , 129)" : "red",
                                                            fontWeight: 500,
                                                        }}>
                                                            {profit && "+"} {filterCoin.price_change_percentage_24h.toFixed(2)}%
                                                        </span>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        {symbol} {" "}  {numberWithCommas(filterCoin.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>


                                                </TableRow>
                                            )

                                        })}

                                    </TableBody>
                                </Table>

                            </>
                        )
                    }
                </TableContainer>
                <Pagination style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"

                }} classes={{ ul: classes.pagination }} count={(handleSearch().length / 10).toFixed(0)}
                    onChange={(_, value) => {
                       setPage(value)
                       window.scrollTo(0, 450);
                    }} />
            </Container>

        </ThemeProvider>
    )
}

export default CoinPage