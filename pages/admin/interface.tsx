import { PencilIcon } from '@heroicons/react/24/outline';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Assets/Button';
import FormCheckbox from '../../components/Assets/FormCheckbox';
import FormInput from '../../components/Assets/FormInput';
import FormTextArea from '../../components/Assets/FormTextArea';
import FullPageLoader from '../../components/Assets/FullPageLoader';
import Message from '../../components/Assets/Message';
import TagSelect from '../../components/Assets/TagsSelect';

import Background from '../../components/Layouts/Background';
import Container from '../../components/Layouts/Container';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { BlogPost } from '../../types/firebaseTypes';
import { formatDateUtil } from '../../utils/dateUtils';
import { getPosts } from '../../utils/firebaseUtils';

const Interface = () => {
  const { user } = UserAuth();
  const { push } = useRouter();
  const [storeTags, setStoreTags] = useState<string[]>();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const initialValues: BlogPost = {
    id: '',
    title: '',
    description: '',
    slug: '',
    thumbnail: '',
    featured_img: '',
    tags: [],
    content: '',
    created_at: '',
    minutes_to_read: null,
    isPublished: false,
  };

  useEffect(() => {
    if (!user) {
      push('/admin');
      return;
    } else {
      const fetchPosts = async () => {
        const posts = await getPosts();
        setAllPosts(posts);
      };
      fetchPosts();

      setIsLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'tags', 'tags'), (doc) => {
        setStoreTags(doc.data()?.list as string[]);
      });

      return () => {
        unsub();
      };
    }
  }, [user]);

  const handleSubmit = async (values: BlogPost): Promise<boolean> => {
    try {
      if (values.id) {
        await setDoc(doc(db, 'blog', values.slug), values);
        return true;
      } else {
        const generatedID = nanoid();
        const valuesWithId = {
          ...values,
          created_at: formatDateUtil(new Date().toDateString()),
          id: generatedID,
        };
        await setDoc(doc(db, 'blog', values.slug), valuesWithId);
        return true;
      }
    } catch (error: any) {
      setMessage(error.message);
      setError(true);
      return false;
    }
  };

  return (
    <>
      <NextSeo noindex nofollow />
      <Background>
        <Container customStyles="sharedLayout min-h-screen">
          {isLoaded ? (
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { resetForm }) => {
                const res = await handleSubmit(values);
                if (res) {
                  setError(false);
                  setMessage('Odeslání proběhlo úspěšně!');
                  resetForm();
                }
              }}
            >
              {({ values, isSubmitting, setValues }) => (
                <>
                  {allPosts?.length ? (
                    <div className="flex flex-col gap-5">
                      <h2 className="title">Dostupné články</h2>

                      <ul className="flex gap-5">
                        {allPosts.map((post) => (
                          <li
                            onClick={() => {
                              setValues(post);
                            }}
                            key={post.title}
                            className="bg-primary-blue flex gap-2 items-center text-white p-3 rounded-sm cursor-pointer"
                          >
                            <PencilIcon className="w-5 h-5" />
                            {post.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-5">
                    <h2 className="title">Nový článek</h2>

                    <Form className="flex flex-col gap-5">
                      <FormInput name="title" label="Nadpis" placeholder="Hello world!" />
                      <FormInput
                        name="slug"
                        label="Slug(url) - nelze později měnit"
                        placeholder="pribehy-ze-svateb"
                        disabled={!!values.id}
                      />
                      <FormInput
                        name="thumbnail"
                        label="Náhledový obrázek"
                        placeholder="https:/..."
                      />
                      <FormInput
                        name="featured_img"
                        label="Hlavní obrázek"
                        placeholder="https:/..."
                      />
                      <FormInput
                        name="description"
                        label="Popisek"
                        placeholder="Jak to vypadá v zákulisí natáčení svateb? Pojdte se semnou podívat na tenhle krásný článek."
                      />
                      <TagSelect
                        name="tags"
                        label="Tagy"
                        firstEmpty
                        options={storeTags}
                        selectedOptions={values.tags}
                      />
                      <FormInput
                        name="minutes_to_read"
                        label="Doba ke čtení v minutách"
                        placeholder="5"
                      />
                      <FormCheckbox
                        name="isPublished"
                        label="Publikovat článek"
                        checked={values.isPublished}
                      />
                      <FormTextArea
                        name="content"
                        label="Obsah"
                        rows={10}
                        cols={10}
                        customStyles={'lg:min-h-[1000px]'}
                      />
                      <Link
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 text-primary-blue text-sm"
                      >
                        Markdown návod ke stylování
                      </Link>
                      {!!message && (
                        <Message
                          isError={error}
                          text={message}
                          clearMessage={() => {
                            setMessage('');
                            setError(false);
                          }}
                        />
                      )}
                      <Button isSubmit loading={isSubmitting} customStyles="lg:max-w-[350px]">
                        Odeslat
                      </Button>
                    </Form>
                  </div>
                </>
              )}
            </Formik>
          ) : (
            <FullPageLoader />
          )}
        </Container>
      </Background>
    </>
  );
};

export default Interface;
