import React from 'react'
import PostsCard from './PostsCard';
import useFetch from '../../hooks/useFetch';
import Loading from '../../Loading/Loading';

const Posts = () => {
  const {data, loading} = useFetch("posts");
  console.log(data);
  return <section className=' flex flex-col gap-[2.5rem]'>
    {loading ? <Loading/> : data.map((post, i) => <PostsCard post={post} key={i}/>)}
  </section>
}

export default Posts;