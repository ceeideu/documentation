## Simple Tokenization (Decrypt / Encrypt)

#### Scala example:

```scala
    val tokenizer = new Tokenizer(HashMap[Int, String](2 -> "41e6765bb8340ef80598a464e87a5fb3abb209ea1c74f07cec61e34ab7d3e6ff"))
    tokenizer.encrypt("AAAX16F6VCZVSSWP")
    tokenizer.decrypt("2QlFswDrBAySXB1wc8OsK3YfN09rstsbPpYsK8oBkQF/NjUuHq3y3zcc3ya0=")
```

#### Helper class:

```scala
import java.security.SecureRandom
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.{GCMParameterSpec, SecretKeySpec}
import scala.collection.mutable.HashMap

class Tokenizer(keys: HashMap[Int, String]) {

  private val TAG_SIZE = 16
  private val NONCE_SIZE = 12

  def encrypt(xid: String): String = {
    var keyID = 0
    var keyValue: String = null
    var continue = true
    for ((id, value) <- keys) {
      keyID = id
      keyValue = value
      continue = false
    }

    if (keyValue == null) throw new Exception("Key is nil")

    val key = hexStringToByteArray(keyValue)
    val nonce = Array.fill[Byte](NONCE_SIZE)(0)
    val random = new SecureRandom
    random.nextBytes(nonce)
    val aesGcm = Cipher.getInstance("AES/GCM/NoPadding")
    val keySpec = new SecretKeySpec(key, "AES")
    val gcmParameterSpec = new GCMParameterSpec(TAG_SIZE * 8, nonce)

    aesGcm.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec)

    val ciphertext = aesGcm.doFinal(xid.getBytes("UTF-8"))
    val encryptedData = nonce ++ ciphertext
    val encodedString = Base64.getEncoder.encodeToString(encryptedData)

    s"$keyID$encodedString"
  }

  def decrypt(token: String): String = {
    val keyID = token.substring(0, 1).toInt
    val tokenBytes = Base64.getDecoder.decode(token.substring(1))
    val keyValue = keys.getOrElse(keyID, throw new Exception("Key not present or null"))

    val key = hexStringToByteArray(keyValue)
    val nonce = tokenBytes.slice(0, NONCE_SIZE)
    val ciphertext = tokenBytes.splitAt(NONCE_SIZE)._2
    val aesGcm = Cipher.getInstance("AES/GCM/NoPadding")
    val keySpec = new SecretKeySpec(key, "AES")
    val gcmParameterSpec = new GCMParameterSpec(TAG_SIZE * 8, nonce)

    aesGcm.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec)

    val decrypted = aesGcm.doFinal(ciphertext)

    new String(decrypted, "UTF-8")
  }

  private def hexStringToByteArray(s: String): Array[Byte] = {
    val len = s.length
    for (i <- 0 until len by 2)
      yield ((Character.digit(s.charAt(i), 16) << 4) + Character.digit(s.charAt(i + 1), 16)).toByte
  }.toArray
}

```
