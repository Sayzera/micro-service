import express, { Request, Response } from "express"
import { validateRequest } from "@szrtickets/common"
import { body } from "express-validator"
import { BadRequestError } from "@szrtickets/common"
import { User } from "../models/user"
import jwt from "jsonwebtoken"

//  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=AYRSACU......q1
//  kubectl get secrets
const router = express.Router()

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError("Email in use")
    }

    const user = User.build({ email, password })
    await user.save()

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    // store it on session object
    req.session = {
      jwt: userJwt,
    }

    res
      .status(201)
      .send({ user, jwt: req.session.jwt, key: process.env.JWT_KEY })
  }
)

module.exports = router
