import { ProductPicker } from "../../components/product/picker";
import { Section } from "../../components/section";
import { ProductSlideSkeleton } from "../../components/skeletons";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const API_URL = "https://newsapi.org/v2/everything?q=acnes&apiKey=39e7db4f6d8640fa88e7e14acb01f95b";

interface NewsItem {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOnClick = (article: NewsItem) => {
    // Navigate and pass the article data via state
    navigate('/NewsFrame', { state: { article } });
  };

  return (
    <Section title="">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Daily News</h2>
        <Button
          size="small"
          onClick={fetchNews}
          className="bg-blue-500 text-white"
        >
          Reload
        </Button>
      </div>

      {loading ? (
        <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
          {[...Array(3)].map((_, i) => (
            <SwiperSlide key={i}>
              <ProductSlideSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
          {news.map((article, index) => (
            <SwiperSlide key={index}>
              <ProductPicker product={{ id: index.toString() }}>
                {({ open }) => (
                  <div onClick={() => handleOnClick(article)}>
                    <Box
                      className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                      style={{
                        backgroundImage: `url(${article.urlToImage || ""})`,
                      }}
                    />
                    <Box className="flex items-center justify-center mt-2">
                      <Text size="small">{article.title}</Text>
                    </Box>
                  </div>
                )}
              </ProductPicker>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

