import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { subMonths, startOfMonth, getUnixTime } from 'date-fns';

function Simulator() {
    const [data, setData] = useState([]);
    const [investment, setInvestment] = useState(0);

    const handleInvestmentChange = (event) => {
        setInvestment(event.target.value);
        console.log("Investment:", event.target.value); // Muestra el valor de investment en la consola
    };

    const fetchData = async () => {
        const dates = Array.from({ length: 12 }, (_, i) => {
            const date = startOfMonth(subMonths(new Date(), i));
            return getUnixTime(date);
        });

        const responses = await Promise.all(dates.map(date => {
            return axios.get(`/api/v2/markets/BTC-CLP/trades?last_timestamp=${date}`)
                .then(response => {
                    console.log(response.data); // Muestra la respuesta de la API en la consola
                    return response;
                })
                .catch(error => {
                    console.error("Error fetching trades:", error); // Muestra el error en la consola
                    return null;
                });
        }));

        const trades = responses.map(response => {
            if (response && response.data && response.data.trades && response.data.trades.entries && response.data.trades.entries.length > 0) {
                return response.data.trades.entries[0];
            } else {
                return null;
            }
        });
        console.log("Trades:", trades); // Muestra los trades en la consola

        let totalInvestment = 0;
        let totalBTC = 0;
        const processedData = trades.map((trade, index) => {
            if (trade) {
                const amount = parseFloat(trade[1]);
                const price = parseFloat(trade[2]);

                totalInvestment += investment;
                const btcBought = investment / price;
                totalBTC += btcBought;

                return {
                    month: index + 1,
                    investment: totalInvestment,
                    btc: totalBTC,
                    value: totalBTC * price,
                    profit: totalBTC * price - totalInvestment,
                };
            }
        });

        const filteredData = processedData.filter(Boolean);
        setData(filteredData);

        // Muestra los datos en la consola
        console.log("Processed Data:", filteredData);
    };

    useEffect(() => {
        fetchData();
    }, [investment]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="investment">Inversión mensual en CLP</label>
                            <input type="number" className="form-control" id="investment" placeholder="Ingrese el monto en CLP" onChange={handleInvestmentChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar simulación</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <LineChart width={500} height={300} data={data}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            </div>
        </div>
    );
}

export default Simulator;