import React, { VFC } from 'react';
import RedditLogo from '../images/reddit.svg';
import Link from 'next/link';

const Navbar: VFC = () => {
	return (
		<div className="fixed px-5 inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
			{/* logo title */}
			<div className="flex items-center">
				<Link href="/">
					<a>
						<RedditLogo className="w-8 h-8 mr-2" />
					</a>
				</Link>
				<span className="text-2xl font-semibold">
					<Link href="/">reddit</Link>
				</span>
			</div>

			{/* search input */}
			<div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
				<i className="fas fa-search pl-4 pr-3 text-gray-500"></i>
				<input
					type="text"
					className="w-160 py-1 bg-transparent pr-3 rounded focus:outline-none"
					placeholder="Search"
				/>
			</div>
			{/* auth button */}
			<div className="flex">
				<Link href="/login">
					<a className="w-32 py-1 mr-4 hollow blue button leading-5">Login</a>
				</Link>
				<Link href="/register">
					<a className="w-32 py-1 blue button leading-5">Sign up</a>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
