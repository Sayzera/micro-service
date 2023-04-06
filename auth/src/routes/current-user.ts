import express from "express"
import { currentUser } from "@szrtickets/common"

const router = express.Router()

/**
 * CurrentUser middleware'i bize req objesinin içinde currentUser özelliğini ekliyor. Bu özellik bizim için önemli çünkü bu özellik sayesinde kullanıcıyı tanımlayabiliyoruz.
 */
router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
})

module.exports = router
