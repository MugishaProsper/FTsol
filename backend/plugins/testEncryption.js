import crypto from 'crypto';

// Generate a random 32-byte key
const key = crypto.randomBytes(32);

// Encrypt function
function encryptData(text) {
  const nonce = crypto.randomBytes(12); // 96-bit nonce
  const cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex'); // Get authentication tag
  return { nonce: nonce.toString('hex'), encryptedData: encrypted, authTag };
}

// Decrypt function
function decryptData(encryptedData, nonce, authTag) {
  const decipher = crypto.createDecipheriv('chacha20-poly1305', key, Buffer.from(nonce, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex')); // Set the authentication tag
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Usage Example
const transactionAmount = "150000";
const { nonce, encryptedData, authTag } = encryptData(transactionAmount);

console.log("Encrypted Data:", encryptedData);
console.log("Nonce:", nonce);
console.log("Auth Tag:", authTag);

// To decrypt
const decryptedData = decryptData(encryptedData, nonce, authTag);
console.log("Decrypted Data:", decryptedData);
