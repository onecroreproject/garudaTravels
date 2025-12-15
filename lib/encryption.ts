import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_SECRET || "mailtrscbe")
  .digest("base64")
  .substring(0, 32); // AES key must be 32 bytes

const IV = Buffer.alloc(16, 0); // static IV for simplicity (you can randomize later)

export function encryptPayload(data: any): string {
  const json = JSON.stringify(data);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(json, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * Decrypts a base64 string back into the original payload object
 * This will be used in the mail microservice
 */
// export function decryptPayload(encrypted: string): any {
//   const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
//   let decrypted = decipher.update(encrypted, 'base64', 'utf8');
//   decrypted += decipher.final('utf8');
//   return JSON.parse(decrypted);
// }
