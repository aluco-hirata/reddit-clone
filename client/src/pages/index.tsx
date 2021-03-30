import Head from 'next/head';
import Axios from 'axios';
import { useEffect, useState } from 'react';

import { Post } from '../types';
import PostCard from '../components/PostCard';

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		Axios.get('/posts')
			.then((res) => setPosts(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="pt-12">
			<Head>
				<title>reddit: the front page</title>
			</Head>
			<div className="container flex pt-4">
				{/* main */}
				<div className="w-160">
					{posts.map((post) => (
						<PostCard post={post} key={post.identifier} />
					))}
				</div>
				{/* sidebar */}
			</div>
		</div>
	);
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	try {
// 		const res = await Axios.get('/posts');

// 		return { props: { posts: res.data } };
// 	} catch (err) {
// 		return { props: { error: 'データがありません' } };
// 	}
// };
