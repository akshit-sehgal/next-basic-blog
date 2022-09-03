import ReactMarkdown from "react-markdown";
import PostHeader from "./PostHeader";
import classes from './post-content.module.css';
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = ({ post }) => {

  const { slug, image, title, content } = post;

  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300} />
    //   )
    // },
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {

        const imgElement = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${imgElement.properties.src}`}
              alt={imgElement.alt}
              width={600}
              height={300} />
          </div>
        );
      }
      return (
        <p>{paragraph.children}</p>
      );
    },
    code(code){
      const {className, children} = code;
      const language = className.split('-')[1];

      const shProps = {
        style: a11yDark,
        language,
        children
      };

      return (
        <SyntaxHighlighter
          {...shProps}
        />
      )
    }
  }

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;