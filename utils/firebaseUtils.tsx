import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types/firebaseTypes';

export const getPosts = async () => {
  const posts = await getDocs(collection(db, 'blog'));
  const initialPosts: BlogPost[] = [];
  posts.forEach((doc) => initialPosts.push(doc.data() as BlogPost));

  return initialPosts;
};

export const getPublishedPosts = async () => {
  const posts = await getDocs(query(collection(db, 'blog'), where('isPublished', '==', true)));

  const initialPosts: BlogPost[] = [];
  posts.forEach((doc) => initialPosts.push(doc.data() as BlogPost));

  return initialPosts;
};

export const getPostById = async (id: string) => {
  const post = await getDoc(doc(db, 'blog', id));

  return post.data();
};
