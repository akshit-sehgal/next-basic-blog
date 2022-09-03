import Head from "next/head";
import { Fragment } from "react";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/post-utils";

const AllPostsPage = (props) => {
  const {posts} = props;

  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all the programming tutorials"/>
      </Head>
    <AllPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    },
    // revalidate: 60 * 30
  }
};

export default AllPostsPage;