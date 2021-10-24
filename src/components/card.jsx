import React from 'react';
import Card from 'react-bootstrap/Card';
import {IconContext} from "react-icons"
import { WiCloudy, WiDaySunny, WiRain, WiFog, WiDayHaze, WiDayHail, WiDayLightning, WiSnow, WiThunderstorm, WiThermometer, WiSunrise, WiSunset, WiHumidity  } from "react-icons/wi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WeatherCard = props => {

    let content = [];
    let header = [];
    let weatherIcon = [];

    let styles= {
        tempRange: {
            height: 25,
            width: 'auto'
        },
        column: {
            margin: 'auto'
        }
    }

    if (props && props.data && props.data.cod === 200) {
        if (props.data.main) {

            if (props.data.weather[0].main.toLowerCase().includes("sun")) {
                weatherIcon.push(<WiDaySunny size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("rain")) {
                weatherIcon.push(<WiRain size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("fog")) {
                weatherIcon.push(<WiFog size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("haze")) {
                weatherIcon.push(<WiDayHaze size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("hail")) {
                weatherIcon.push(<WiDayHail size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("light")) {
                weatherIcon.push(<WiDayLightning size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("snow")) {
                weatherIcon.push(<WiSnow size="lg" className="" />);
            } else if (props.data.weather[0].main.toLowerCase().includes("thunder")) {
                weatherIcon.push(<WiThunderstorm size="lg" className="" />);
            } else {
                weatherIcon.push(<WiCloudy size="lg" className="" />);
            }


            header.push(
                <Row >
                    <Col sm={2}>
                        {weatherIcon}
                    </Col>
                    <Col sm={10} style={styles.column}>
                        <h2>{props.data.name}, {props.data.sys.country}</h2>
                        <p>
                            <AiOutlineArrowDown title="Minimum" size="sm" className="" style={styles.tempRange} />
                            <span>{(props.data.main.temp_min - 273.15).toFixed(2)} &deg;C</span>
                            &nbsp; &nbsp;
                            <AiOutlineArrowUp title="Maximum" size="sm" className="" style={styles.tempRange} />
                            <span>{(props.data.main.temp_max - 273.15).toFixed(2)} &deg;C</span>
                        </p>
                    </Col>
                </Row>
            );
        }

        if (props.data.main && props.data.main.temp) {
            content.push(
                <div>
                    <Row><Col sm={1}><WiThermometer size="sm" title="Temperature" className="" /></Col><Col style={styles.column}> {(props.data.main.temp - 273.15).toFixed(2)} &deg;C</Col></Row>
                    <Row><Col sm={1}><WiSunrise size="sm" title="Sunrise" className="" /></Col><Col style={styles.column}> {new Date(props.data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</Col></Row>
                    <Row><Col sm={1}><WiSunset size="sm" title="Sunset" className="" /></Col><Col style={styles.column}> {new Date(props.data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</Col></Row>
                    <Row><Col sm={1}><WiHumidity size="sm" title="Humidity" className="" /></Col><Col style={styles.column}> {props.data.main.humidity} %</Col></Row>
                </div>
            )
        }
    } else {
        header.push(
            <Row>
                <Col>
                    <h2>{props.data.message}</h2>
                </Col>
            </Row>
        )
    }

    return (
       <div>
           <div>{header}</div>
           <div>
               {content && content.length ?
                <div>
                    {content}
                </div>
                :
                null
               }
           </div>
       </div>
    )
}

export default WeatherCard;