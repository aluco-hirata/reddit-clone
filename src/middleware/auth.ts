import { NextFunction, Request, Response } from 'express';
import User from '../entities/User';

export default async (_: Request, res: Response, next: NextFunction) => {
	try {
    const user: User | undefined = res.locals.user
    if(!user) throw new Error('認証できませんでした')

    return next();
    
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: '認証できませんでした' });
	}
};
