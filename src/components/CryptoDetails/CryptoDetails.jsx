import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  fetchCoinDetails,
  fetchCoinChart,
  clearCoin,
} from "../../redux/actions";
import Loader from "./../Loader/Loader";
import LineChart from "../LineChart/LineChart";
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const coin = useSelector((state) => state.cryptoReducer.singleCoin);
  const coinHistory = useSelector((state) => state.cryptoReducer.coinChart);
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const [timePeriod, setTimePeriod] = useState("7d");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
    dispatch(fetchCoinChart(coinId, timePeriod));
    return () => {
      dispatch(clearCoin());
    };
  }, []);
  const timePeriodHandler = (value) => {
    setTimePeriod(value);
    dispatch(fetchCoinChart(coinId, timePeriod));
  };
  if (!coin.length) return <Loader />;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${millify(coin[0].price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin[0].rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coin[0]["24hVolume"] && millify(coin[0]["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coin[0].marketCap && millify(coin[0].marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(coin[0].allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin[0].numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin[0].numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coin[0].supply.confirmed ? (
        <CheckOutlined style={{ color: "green" }} />
      ) : (
        <StopOutlined style={{ color: "red" }} />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(coin[0].supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coin[0].supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coin[0].name} ({coin[0].symbol}) Price
        </Title>
        <p>
          {coin[0].name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => timePeriodHandler(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coin[0].price)}
        coinName={coin[0].name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coin[0].name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {coin[0].name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {coin[0].name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coin[0].name}?
          </Title>
          {HTMLReactParser(coin[0].description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coin[0].name} Links
          </Title>
          {coin[0].links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
