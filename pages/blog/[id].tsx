import Image from 'next/image';
import React from 'react';
import Background from '../../components/Layouts/Background';
import Container from '../../components/Layouts/Container';
import Tags from '../../components/Shared/Tags';
import { BlogPost } from '../../types/firebaseTypes';
import { getPostById, getPublishedPosts } from '../../utils/firebaseUtils';
import ReactMarkdown from 'react-markdown';
import { MarkdownComponents } from '../../components/Assets/MarkdownComponent';
import { NextSeo } from 'next-seo';

interface SinglePostProps {
  postData: BlogPost;
}

const SinglePost: React.FC<SinglePostProps> = ({ postData }) => {
  const { title, tags, featured_img, content, created_at, description } = postData;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Background>
        <Container customStyles="flex flex-col gap-10">
          <div className="flex justify-between items-center gap-10">
            <h1 className="title">{title}</h1>
            <p className="text-primary-gray">{created_at}</p>
          </div>
          <Tags tags={tags} />
          <div className="relative h-[600px] w-full">
            <Image
              src={featured_img}
              alt="featured-img"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <ReactMarkdown
            className="prose prose-h1:font-semibold prose-lg max-w-none"
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        </Container>
      </Background>
    </>
  );
};

export async function getStaticPaths() {
  const allPosts = await getPublishedPosts();
  const paths = allPosts.map((post) => ({
    params: { id: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostById(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default SinglePost;
