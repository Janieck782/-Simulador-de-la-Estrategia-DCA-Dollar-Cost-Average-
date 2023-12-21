import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { startOfMonth, getUnixTime, startOfDay, differenceInMonths, addMonths, format } from 'date-fns';
import { es } from 'date-fns/locale';

function Simulator() {
    const [data, setData] = useState([]);
    const [investment, setInvestment] = useState(500);
    const [startYear, setStartYear] = useState(2022);
    const [endYear, setEndYear] = useState(2023);
    const [startMonth, setStartMonth] = useState(1);
    const [endMonth, setEndMonth] = useState(12);

    useEffect(() => {
        fetchData();
    }, [startYear, endYear, startMonth, endMonth, investment]);

    const fetchData = async () => {
        let startDate = new Date(startYear, startMonth - 1);
        let endDate = new Date(endYear, endMonth - 1);
        let monthsBetween = differenceInMonths(endDate, startDate);

        if (monthsBetween > 12) {
            endDate = addMonths(startDate, 12);
            monthsBetween = 12;
        }

        const dates = Array.from({ length: monthsBetween }, (_, i) => {
            const date = startOfDay(startOfMonth(addMonths(startDate, i)));
            return getUnixTime(date);
        });

        const responses = await Promise.all(dates.map(date => {
            let url;
            if (process.env.NODE_ENV === 'development') {
                url = `/api/v2/markets/BTC-CLP/trades?timestamp=${date * 1000}&limit=1`;
            } else {
                url = `https://www.buda.com/api/v2/markets/BTC-CLP/trades?timestamp=${date * 1000}&limit=1`;
            }
            return axios.get(url)
                .then(response => response)
                .catch(error => {
                    console.error("Error fetching trades:", error);
                    return null;
                });
        }));

        // Procesamiento de los datos
        const trades = responses.map(response => {
            if (response && response.data && response.data.trades && response.data.trades.entries && response.data.trades.entries.length > 0) {
                const trade = response.data.trades.entries[0];
                const timestamp = parseInt(trade[0]);
                const date = new Date(timestamp);
                return {
                    date,
                    amount: parseFloat(trade[1]),
                    price: parseFloat(trade[2]),
                    type: trade[3],
                    id: trade[4]
                };
            } else {
                return null;
            }
        }).filter(Boolean);

        // Lógica para calcular los datos del gráfico
        let totalInvestment = 0;
        let totalBTC = 0;
        const processedData = trades.map((trade, index) => {
            const amount = trade.amount;
            const price = trade.price;

            totalInvestment += investment;
            const btcBought = investment / price;
            totalBTC += btcBought;

            return {
                month: index + 1,
                monthYear: format(trade.date, 'MMMM yyyy', { locale: es }),
                investment: totalInvestment,
                btc: totalBTC,
                value: totalBTC * price,
                profit: totalBTC * price - totalInvestment,
                variationCLP: Math.abs(totalBTC * price - totalInvestment),
                variationPercent: ((totalBTC * price - totalInvestment) / totalInvestment) * 100,
            };
        });

        setData(processedData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const investment = Number(event.target.elements.investment.value);
        const startDate = event.target.elements.startDate.value;
        const endDate = event.target.elements.endDate.value;

        const [startYear, startMonth] = startDate.split("-");
        const [endYear, endMonth] = endDate.split("-");

        let startDateObj = new Date(startYear, startMonth - 1);
        let endDateObj = new Date(endYear, endMonth - 1);
        let monthsBetween = differenceInMonths(endDateObj, startDateObj);

        if (monthsBetween <= 12) {
            setInvestment(investment);
            setStartYear(startYear);
            setStartMonth(startMonth);
            setEndYear(endYear);
            setEndMonth(endMonth);
            fetchData();
        } else {
            alert("La diferencia entre las fechas de inicio y fin no puede ser mayor a 12 meses");
        }
    };

    useEffect(() => {
        fetchData();
    }, [investment, startYear, endYear, startMonth, endMonth]);

    return (
        <div className="container-fluid bg-dark-subtle ">
            <div className="row">
                <div className="col-md-4  d-flex">
                    <div className="card m-3 flex-fill">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group m-2">
                                    <label htmlFor="investment">Inversión mensual en CLP</label>
                                    <input type="number" className="form-control" id="investment" placeholder="Ingrese el monto en CLP" defaultValue={500} />
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="startDate">Fecha de inicio</label>
                                    <input type="month" className="form-control" id="startDate" defaultValue="2023-01" />
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="endDate">Fecha de fin</label>
                                    <input type="month" className="form-control" id="endDate" defaultValue="2023-12" />
                                </div>
                                <button type="submit" className="btn btn-primary m-3" style={{backgroundColor: '#1440fb'}}>Iniciar simulación</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8  d-flex">
                    <div className="card m-3 flex-fill">
                        <div className="card-body d-flex justify-content-center align-items-center">
                            <LineChart width={600} height={300} data={data}>
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="monthYear" />
                                <YAxis />
                                <Tooltip formatter={(value) => value.toFixed(2)} />
                            </LineChart>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card m-3">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Mes</th>
                                        <th scope="col">Value</th>
                                        <th scope="col">Profit</th>
                                        <th scope="col">Variación CLP</th>
                                        <th scope="col">Variación %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.monthYear}</td>
                                            <td>{item.value.toFixed(2)}</td>
                                            <td>{item.profit.toFixed(2)}</td>
                                            <td>{item.variationCLP.toFixed(2)}</td>
                                            <td>{item.variationPercent.toFixed(2) + "%"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Simulator;