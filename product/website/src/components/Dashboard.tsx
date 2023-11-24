"use client"

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import WebSocket from 'ws';
import axios from "axios";

const Dashboard: React.FC = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [prices, setPrices] = useState({});
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Fetch crypto data from API 1
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("https://api1.example.com/crypto");
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();

    // Connect to WebSocket for real-time price updates
    const ws = new WebSocket("wss://api2.example.com/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "price") {
        const { asset, price } = data;
        setPrices((prevState) => ({ ...prevState, [asset]: price }));
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const addToWatchlist = (asset) => {
    setWatchlist([...watchlist, asset]);
  };

  const removeFromWatchlist = (asset) => {
    setWatchlist(watchlist.filter((item) => item !== asset));
  };

  return (
    <div>
      <Box sx={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Crypto Data</Typography>
                <ul>
                  {cryptoData.map((crypto) => (
                    <li key={crypto.id}>
                      {crypto.name} - ${crypto.price}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Watchlist</Typography>
                <ul>
                  {watchlist.map((asset) => (
                    <li key={asset}>
                      {asset} - ${prices[asset] || "--"}
                      <button onClick={() => removeFromWatchlist(asset)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <input type="text" placeholder="Add asset to watchlist" />
                <button onClick={() => addToWatchlist(event.target.value)}>
                  Add
                </button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
