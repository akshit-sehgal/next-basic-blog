import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "../../lib/post-utils";

const PostDetailPage = (props) => {

  const {post} = props;

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt}/>
      </Head>
      <PostContent post={post}/>
    </Fragment>
  );
};

export const getStaticProps = (context) => {
  const { params: { slug } } = context;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData
    },
    revalidate: 60 * 10
  }
};

export const getStaticPaths = () => {
  const postFileNames = getPostsFiles();

  const paths = postFileNames.map((file) => ({ params: { slug: file.replace(/\.md$/, '') } }));

  return {
    paths,
    fallback: false
  }
}

export default PostDetailPage;