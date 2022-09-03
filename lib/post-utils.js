import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostData = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: metaData, content: postContent } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...metaData,
    content: postContent
  };

  return postData;
}

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((file) => getPostData(file));
  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1))
  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}