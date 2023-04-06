import { requireAuth } from "@szrtickets/common"
import express, { Request, Response } from "express"

const router = express.Router()
/**
 * @description requireAuth middleware'inden önce currentUser middleware'ini çalıştırır. currentUser middleware'i req.currentUser
 * objesinin içini doldurur. requireAuth ise currentUser dolumu diye bakar eğer dolu değilse 401 durum kodu geriye döndürür
 */

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.status(200).send({})
})

module.exports = router
