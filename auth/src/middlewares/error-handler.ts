import { NextFunction, Request, Response } from "express"
import { CustomError } from "../errors/custom-error"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Böyle bir hata sınıfı varsa
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  res.status(500).send({
    message: "Something went wrong" + err.message,
  })
}
