import React, { useCallback, useEffect, useRef, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useQuery } from "react-query";

import weather from '../resource/images/weather.png';
import WeatherCard from './card';

const Home = () => {

    const [searchtext, setCityName] = useState("");
    const [weatherData, setWeather] = useState({});
    const cityText = useRef(null);

    useEffect(() => {
        if (!searchtext) {
            return;
        }
    }, [searchtext, weatherData])

    const getWeather = async(searchText) => {
        if (searchText.queryKey[0]) {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText.queryKey[0]}&appid=858f15fed9292cbe25c341a754c55e45`).then(data => data.json())
            .then((response) => {
                setWeather(response);
            }).catch((response) => {
                console.log(response);
            });
        }
    }

    const { data, isLoading, refetch } = useQuery(searchtext, getWeather, {refetchOnWindowFocus: false, enabled: !!searchtext, manual: true});

    const handleSubmit = useCallback((event) => {
        setCityName(cityText.current.value);
        refetch();
        event.preventDefault();
    }, []
    );

    return (
        <React.Fragment>
            <Container height="auto">
            <header>            
                <Navbar bg="dark" fixed="top" variant="dark"> 
                    <Container fluid="sm">                   
                    <Navbar.Brand href="#home">
                        <img
                            src={weather}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Weather"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Weather</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="text" ref={cityText} />
                            </form>
                        </div>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <div style={{ paddingTop: 70 }}>
            {!isLoading && weatherData && weatherData.cod ?
                <WeatherCard data={weatherData} />
            :
                null
            }
            </div>
            </Container>
        </React.Fragment>
    )
}

export default Home;