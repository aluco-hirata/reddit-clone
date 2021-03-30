import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Post } from '../types';
import Axios from 'axios';
import classnames from 'classnames';

type PostCardProps = {
	post: Post;
};

const ActionButton = ({ children }) => {
	return (
		<div className="px-1 py-1 mr-2 text-xs font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200">
			{children}
		</div>
	);
};

dayjs.extend(relativeTime);

const PostCard = ({
	post: {
		identifier,
		slug,
		title,
		body,
		subName,
		createdAt,
		voteScore,
		userVote,
		commentCount,
		url,
		username,
	},
}: PostCardProps) => {
	const vote = async (value) => {
		try {
			const res = await Axios.post('/misc/vote', {
				identifier,
				slug,
				value,
			});

			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div key={identifier} className="flex mb-4 bg-white rounded">
			{/* vote section */}
			<div className="w-10 text-center bg-gray-200 rounded-l">
				<div
					className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
					onClick={() => vote(1)}
				>
					<i className={classnames('icon-arrow-up', { 'text-red-500': userVote === 1 })}></i>
				</div>
				<p className="text-xs font-bold">{voteScore}</p>
				<div
					className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
					onClick={() => vote(-1)}
				>
					<i className={classnames('icon-arrow-down', { 'text-blue-600': userVote === -1 })}></i>
				</div>
			</div>
			{/* vote section */}

			<div className="w-full p-2">
				<div className="flex items-center">
					<Link href={`/r/${subName}`}>
						<>
							<img
								src="https://schoolshop-lab.jp/wp-content/uploads/2018/11/240ec862387d03003cb4c41cd93cb0be.png"
								alt=""
								className="w-6 h-6 mr-1 rounded-full cursor-pointer"
							/>
							<a className="text-xs font-bold cursor-pointer hover:underline">/r/${subName}</a>
						</>
					</Link>
					<p className="text-xs text-gray-500">
						<span className="mx-1">●</span>
						Posted by
						<Link href={`/u/${username}`}>
							<a href="" className="mx-1 hover:underline">
								/u/{username}
							</a>
						</Link>
						<Link href={`/r/${subName}/${identifier}/${slug}`}>
							<a className="mx-1 hover:underline">{dayjs(createdAt).fromNow()}</a>
						</Link>
					</p>
				</div>
				<Link href={url}>
					<a className="my-1 text-lg font-medium">{title}</a>
				</Link>
				{body && <p className="my-1 text-sm">{body}</p>}

				<div className="flex">
					<Link href={url}>
						<a>
							<ActionButton>
								<i className="fas fa-comment-alt fa-xs mr-1"></i>
								<span>{commentCount} commnets</span>
							</ActionButton>
						</a>
					</Link>
					<ActionButton>
						<i className="mr-1 fas fa-share fa-xs"></i>
						<span className="font-bold">Share</span>
					</ActionButton>
					<ActionButton>
						<i className="mr-1 fas fa-bookmark fa-xs"></i>
						<span className="font-bold">Save</span>
					</ActionButton>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
