const crypto = require('crypto');

class AESCryptData {
  constructor(key) {
    this.encryptionKey = key;
    this.binaryEncryptionKey = Buffer.from(this.encryptionKey);
    this.binaryIV = Buffer.alloc(0);
  }

  // Encrypt
  encrypt(unEncryptedInput) {
    try {
      const cipher = crypto.createCipheriv('AES-128-ECB', this.binaryEncryptionKey, this.binaryIV);
      const encryptedInput = (cipher.update(unEncryptedInput, 'utf8', 'base64') + cipher.final('base64'));
      // logger.info(encryptedInput);
      return encryptedInput;
    } catch (err) {
      return '';
    }
  }

  // Decrypt
  decrypt(encryptedInput) {
    try {
      const decipher = crypto.createDecipheriv('AES-128-ECB', this.binaryEncryptionKey, this.binaryIV);
      const decryptedInput = (decipher.update(encryptedInput, 'base64', 'utf8') + decipher.final('utf8'));
      // logger.info(decryptedInput);
      return decryptedInput;
    } catch (err) {
      return '';
    }
  }
}

module.exports = AESCryptData;
