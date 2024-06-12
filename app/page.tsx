"use client";
import Head from "next/head";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getAPICall } from "@/lib/apiManager";

interface Restaurant {
  country: string;
  gmapsLink: string | null;
  michelin: string | null;
  name: string;
  ourRating: number | null;
  willReturn: boolean | null;
}

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

  return (
    <div>
      <Head>
        <title>Foodie Jac & Kev</title>
      </Head>
      {loading ? (
        <>Loading</>
      ) : (
        <Row gutter={[16, 16]}>
          {restaurants.map((r) => {
            return (
              <Col xs={24} lg={8} key={r.name}>
                <Card title={r.name} bordered={false}>
                  {r.country}
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
