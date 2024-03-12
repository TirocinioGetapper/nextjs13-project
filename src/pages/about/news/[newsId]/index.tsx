import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetStaticPropsResult, GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next";

type NewsDetailsProps = {
  news: {
    id: string;
    title: string;
  };
};

const NewsDetails = memo(({ news }: NewsDetailsProps) => {
  return (
    <>
      <AppHead title="NewsDetails" description="" />

      <div>news</div>
      <div>{news.title}</div>
      <div>{news.id}</div>
    </>
  );
});
NewsDetails.displayName = "NewsDetails";

export default NewsDetails;

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{
    newsId: string;
  }>
> {
  // Leggo dal DB Fake tutti gli id delle news
  const newsList = [
    {
      id: "1",
      title: "Titolo 1",
    },
    {
      id: "2",
      title: "Titolo 2",
    },
  ];
  return {
    paths: newsList.map((news) => ({
      params: {
        newsId: news.id,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({
  params: { newsId },
}: GetStaticPropsContext<{ newsId: string }>): Promise<
  GetStaticPropsResult<NewsDetailsProps>
> {
  // Leggo dal DB FAKE la news con id = newsId

  const news = {
    id: newsId,
    title: "titolo della news",
  };

  return {
    props: { news },
  };
}
