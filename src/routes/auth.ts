import { Request, Response, Router } from 'express';
import { validate, isEmpty } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import User from '../entities/User';
import auth from '../middleware/auth'


const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	try {
		// todo validate data
		let errors: any = {};
		const emailUser = await User.findOne({ email });
		const usernameUser = await User.findOne({ username });

		if (emailUser) errors.email = 'このEmailはすでに使用されています';
		if (usernameUser) errors.username = 'このusernameはすでに使用されています';

		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}
		// todo create user
		const user = new User({ email, username, password });

		errors = await validate(user);
		if (errors.length > 0) {
			return res.status(400).json(errors);
		}
		await user.save();

		// return the user
		return res.json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		let errors: any = {};

		if (isEmpty(username)) errors.username = 'ユーザーネームを入力してください';
		if (isEmpty(password)) errors.password = 'パスワードを入力してください';
		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}

		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: 'ユーザーが見つかりません' });

		const passwordMatches = await bcrypt.compare(password, user.password);
		if (!passwordMatches) {
			return res.status(401).json({ password: 'パスワードが正しくありません' });
		}

		const token = jwt.sign({ username }, process.env.JWT_SECRET!);

		res.set(
			'Set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 3600,
				path: '/',
			}),
		);
		return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({error: "異常が発生しました"})
  }
};

const me = (_: Request, res: Response) => {
	return res.json(res.locals.user)
};

const logout = (_: Request, res: Response) => {
	res.set(
		'Set-Cookie',
		cookie.serialize('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			expires: new Date(0),
			path: '/',
		}),
	);

	return res.status(200).json({ success: true });
};

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.get('/logout', auth, logout);

export default router;
