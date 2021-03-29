import Head from 'next/head';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Post } from '../types';

dayjs.extend(relativeTime);

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
						<div key={post.identifier} className="flex mb-4 bg-white rounded">
							<div className="w-10 text-center bg-gray-200 rounded-l">
								<p>V</p>
							</div>
							<div className="w-full p-2">
								<div className="flex items-center">
									<Link href={`/r/${post.subName}`}>
										<>
											<img
												src="https://schoolshop-lab.jp/wp-content/uploads/2018/11/240ec862387d03003cb4c41cd93cb0be.png"
												alt=""
												className="w-6 h-6 mr-1 rounded-full cursor-pointer"
											/>
											<a className="text-xs font-bold cursor-pointer hover:underline">
												/r/${post.subName}
											</a>
										</>
									</Link>
									<p className="text-xs text-gray-500">
										<span className="mx-1">●</span>
										Posted by
										<Link href={`/u/${post.username}`}>
											<a href="" className="mx-1 hover:underline">
												/u/{post.username}
											</a>
										</Link>
										<Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`}>
											<a className="mx-1 hover:underline">{dayjs(post.createdAt).fromNow()}</a>
										</Link>
									</p>
								</div>
								<Link href={post.url}>
									<a className="my-1 text-lg font-medium">{post.title}</a>
								</Link>
								{post.body && <p className="my-1 text-sm">{post.body}</p>}

								<div className="flex">
									<Link href={post.url}>
										<a>
											<div className="px-1 py-1 mr-2 text-xs font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200">
												<i className="fas fa-comment-alt fa-xs mr-1"></i>
												<span>20 commnets</span>
											</div>
										</a>
									</Link>
									<div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
										<i className="mr-1 fas fa-share fa-xs"></i>
										<span className="font-bold">Share</span>
									</div>
									<div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
										<i className="mr-1 fas fa-bookmark fa-xs"></i>
										<span className="font-bold">Save</span>
									</div>
								</div>
							</div>
						</div>
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
