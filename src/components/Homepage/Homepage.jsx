import React, { useContext } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cryptocurrencies } from "..";
import News from "./../News/News";
import { navbarContext } from "../../context/navbarContext";
const { Title } = Typography;

const Homepage = () => {
  const {
    total24hVolume,
    totalCoins,
    totalExchanges,
    totalMarketCap,
    totalMarkets,
  } = useSelector((state) => state.cryptoReducer.MarketState);

  const { setSelectedIndex } = useContext(navbarContext);

  return (
    <div>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={totalCoins && parseInt(totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={totalExchanges && millify(parseInt(totalExchanges))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={totalMarketCap && millify(parseInt(totalMarketCap))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={total24hVolume && millify(parseInt(total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={totalMarkets && millify(parseInt(totalMarkets))}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={5} className="show-more">
          <Link
            to="/Cryptocurrencies"
            onClick={() => {
              setSelectedIndex("1");
            }}
          >
            Show More
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={5} className="show-more">
          <Link
            to="/news"
            onClick={() => {
              setSelectedIndex("3");
            }}
          >
            Show More
          </Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
