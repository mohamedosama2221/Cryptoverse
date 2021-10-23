import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader2 from "./../Loader/Loader2";
import Loader from "./../Loader/Loader";
import { Typography, Row, Col, Avatar, Card, Select } from "antd";
import { fetchMarketState, fetchMarketNews } from "./../../redux/actions";
const { Option } = Select;
const { Title, Text } = Typography;
const imgPlaceholder =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsReducer.news);
  const coins = useSelector((state) => state.cryptoReducer.coins);
  const [newCategory, setNewCategory] = useState("Cryptocurrency");
  const newsArray = simplified ? news?.slice(0, 6) : news;

  useEffect(() => {
    dispatch(fetchMarketNews(newCategory));
    dispatch(fetchMarketState());
  }, [newCategory]);

  if (!news.length && simplified)
    return (
      <Row gutter={[24, 24]}>
        {Array.from(Array(6)).map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <Loader2 />
            </Card>
          </Col>
        ))}
      </Row>
    );
  if (!news.length && !simplified) return <Loader />;
  return (
    <Row gutter={[32, 32]}>
      {!simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Crypto.."
            optionFilterProp="children"
            onChange={(value) => {
              setNewCategory(value);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {coins?.map((coin, i) => (
              <Option key={i} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {newsArray.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card news-card--active">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-Title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || imgPlaceholder}
                    alt=""
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        imgPlaceholder
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default News;
