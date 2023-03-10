import { doc, getDoc } from 'firebase/firestore';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Background from '../../components/Layouts/Background';
import Container from '../../components/Layouts/Container';
import ContactMe from '../../components/Shared/ContactMe';
import Tags from '../../components/Shared/Tags';
import { db } from '../../firebase';
import { BlogPost, ContactComponent } from '../../types/firebaseTypes';
import { getPublishedPosts } from '../../utils/firebaseUtils';

interface BlogProps {
  allPosts: BlogPost[];
  contactData: ContactComponent;
}

const Blog: React.FC<BlogProps> = ({ allPosts, contactData }) => {
  return (
    <>
      <NextSeo title="Blog" />
      <Background>
        <Container customStyles="min-h-screen sharedLayout">
          <h1 className="title">BLOG</h1>

          <div>
            {!allPosts?.length ? (
              <p>Momentálně nemáme k dispozici žádné příspěvky.</p>
            ) : (
              <>
                {allPosts?.map(({ title, id, created_at, tags, thumbnail, description, slug }) => (
                  <Link key={id} href={`/blog/${slug}`}>
                    <div
                      className="bg-secondary-white border-2 rounded-sm  border-primary-white  hover:border-primary-blue hover:shadow-xl hover:shadow-primary-blue/50 transition duration-200 
                lg:flex lg:flex-row lg:justify-between "
                    >
                      <div className="flex flex-col gap-5 p-5 ">
                        <h2 className="text-h3 lg:text-h2"> {title}</h2>
                        <div className="flex flex-col gap-5">
                          <p className="text-primary-gray"> {created_at}</p>
                          <Tags tags={tags} />
                        </div>
                        <p className="text-primary-gray">{description}</p>
                      </div>
                      <Image
                        src={thumbnail}
                        width={800}
                        height={800}
                        alt={title}
                        className={
                          'rounded-b-sm lg:w-1/3 lg:h-auto lg:rounded-none lg:rounded-r-sm '
                        }
                      />
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>

          <ContactMe
            title={contactData.title}
            buttonText={contactData.buttonText}
            description={contactData.description}
          />
        </Container>
      </Background>
    </>
  );
};

export async function getStaticProps() {
  const allPosts = await getPublishedPosts();
  const contactSnapshot = await getDoc(doc(db, 'shared', 'contactComponent'));

  const contactData = contactSnapshot.data();

  return {
    props: {
      allPosts,
      contactData,
    },
  };
}

export default Blog;
