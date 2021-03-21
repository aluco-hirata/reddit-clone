import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';
import Axios from 'axios';
import InputGroup from '../src/components/InputGroup';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<any>({});

	const router = useRouter();

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		try {
			await Axios.post('/auth/login', {
				username,
				password,
			});

			router.push('/');
		} catch (err) {
			setErrors(err.response.data);
		}
	};

	return (
		<div className="flex">
			<Head>
				<title>Login</title>
			</Head>
			<div
				className="w-36 h-screen bg-cover bg-center"
				style={{ backgroundImage: "url('/images/bricks.jpg')" }}
			></div>
			<div className="flex flex-col justify-center pl-6">
				<div className="w-70">
					<h1 className="text-lg mb-2 font-medium">Login</h1>
					<p className="mb-10 text-xs">
						By continuing, you agree to our User Agreement and Privacy Policy
					</p>

					<form onSubmit={submitForm}>
						<InputGroup
							type="text"
							className="mb-2"
							value={username}
							setValue={setUsername}
							placeholder="Username"
							error={errors.username}
						/>
						<InputGroup
							type="password"
							className="mb-4"
							value={password}
							setValue={setPassword}
							placeholder="Password"
							error={errors.password}
						/>

						<button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
							Login
						</button>
					</form>
					<small>
						新規作成はこちら
						<Link href="/register">
							<a className="ml-1 text-blue-500 uppercase">Sing up</a>
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
};

export default Register;
