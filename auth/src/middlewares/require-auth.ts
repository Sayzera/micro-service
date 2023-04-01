import { Request, Response, NextFunction } from "express"
import { NotAuthorizedError } from "../errors/not-authorized-error"
/**
 *
 * @param req
 * @param res
 * @param next
 * @description önce currentUser middleware'ini çalıştırır. currentUser middleware'i req.currentUser'a atar. Eğer req.currentUser yoksa NotAuthorizedError fırlatır. Eğer req.currentUser varsa next() ile bir sonraki middleware'e geçer.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  next()
}
