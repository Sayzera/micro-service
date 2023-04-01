import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload {
  id: string
  email: string
}
/**
 * Express kütüphanesinde Request interfacene yeni bir özellik eklemek için bu özelliğin adı currentUser olacak ve bunun tipi UserPayload olacak.
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload // current user'ın tipi UserPayload olarak ayarladık
    req.currentUser = payload
  } catch (err) {}

  next()
}
