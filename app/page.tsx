"use client";
import { Avatar, Card, Col, Icon, Row } from "antd";
import { useEffect, useState } from "react";
import { getAPICall } from "@/lib/apiManager";
import Image from "next/image";

interface Restaurant {
  country: string;
  gmapsLink: string | null;
  michelin: string | null;
  name: string;
  ourRating: number | null;
  willReturn: boolean | null;
}

const { Meta } = Card;

function Home() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchData = async () => {
    const res = await getAPICall("restaurants");
    const { data } = res;
    console.log(data);
    if (data && data.length) setRestaurants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDescription = (description: string | null) => {
    if (!description) return <></>;
    if (["1", "2", "3", "Guide"].includes(description)) {
      return (
        <Image
          src={
            description === "Guide" ? `/MichelinGuide.png` : `/MichelinStar.svg`
          }
          alt="MichelinStar"
          width="16"
          height="16"
        />
      );
    }
    return <>{description}</>;
  };

  return (
    <div>
      {loading ? (
        <>Loading</>
      ) : (
        <Row gutter={[16, 16]}>
          {restaurants.map((r) => {
            return (
              <Col xs={24} lg={8} key={r.name}>
                <Card bordered={false}>
                  <Meta
                    avatar={
                      <Avatar
                        src={`https://flagcdn.com/w80/${r.country.toLowerCase()}.png`}
                      />
                    }
                    title={r.name}
                    description={getDescription(r.michelin)}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default Home;
