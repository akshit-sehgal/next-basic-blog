import Head from "next/head";
import { Fragment, useEffect } from "react";
import FeaturedPosts from "../components/home-page/FeaturesPosts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/post-utils";

const HomePage = (props) => {
  const { posts } = props;

  useEffect(()=>{
    console.log(process.env.some_random_key);
  },[]);

  return (
    <Fragment>
      <Head>
        <title>Akshit's Blog</title>
        <meta name='description' content='I post about programming and web development'/>
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  )
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    },
    // revalidate: 60 * 30
  }
};

export default HomePage;