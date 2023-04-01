import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(scrypt)

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex")
    const buf = (await scryptAsync(password, salt, 64)) as Buffer
    // hex ve salt değerini birleştirip return ediyoruz fakat bu değerlerin birbirinden ayrılması gerekiyor bu yüzden compare fonksiyonunda bunu ayrıştırıyoruz
    return `${buf.toString("hex")}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".")
    /**
     * salt kullanımı: Hashlenmiş şifrede salt kullanılırsa aynı şifrenin farklı bir hash değeri üretilir ve daha güçlü bir şifre olur
     */
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

    return buf.toString("hex") === hashedPassword
  }
}
