This document provides technical documentation for integrating a partner with the Central & Eastern Europe ID (CEEid) system. It includes details on obtaining and using the CEEid identifier (xID), as well as guidelines for decryption processes.

### Glossary

- **CEEid**: Official short version name for 'Central & Eastern Europe ID'.
- **xID**: Internal name of our CEEID identifier.
- **Token / CEEid Token**: Encrypted version of xID.
- **HEM**: Normalised and encrypted email representation using SHA-256 (Secure Hash Algorithm 256-bit), a cryptographic hash function.
- **Encryption / Tokenisation**: Encryption is the process of converting sensitive information or ordinary data into an unreadable form, called ciphertext, using an algorithm and a secret key. The purpose of encryption is to ensure data confidentiality and security by preventing unauthorised access to the original data.
- **Decryption**: It is the reverse operation of encryption, which is the process of converting plaintext into ciphertext using an encryption algorithm and a secret key.
- **AES**: AES stands for Advanced Encryption Standard. It is a symmetric encryption algorithm used to secure sensitive data by converting plaintext into ciphertext. AES is widely adopted and considered one of the most secure encryption algorithms available today.

### Obtaining XID

To obtain an XID identifier, the partner needs to make an HTTP GET request to the `/xid/lookup` endpoint. The request must include the `hem` parameter. The server will respond with a JSON object containing the `value` field.

If there are any issues, we can adjust the endpoint to meet the specific needs of the partner.

#### Request

```http
GET /xid/lookup?hem=0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF
```

- `hem` parameter is mandatory and must contain the HEM value in hexadecimal format.

#### Example 200 OK Response

```json
{
  "value": "2QlFswDrBAySXB1wc8OsK3YfN09rstsbPpYsK8oBkQF/NjUuHq3y3zcc3ya0="
}
```

#### Possible Responses

- **200 OK**: Match found, `value` contains the identified CEEid Token.
  ```json
  {
    "value": "2QlFswDrBAySXB1wc8OsK3YfN09rstsbPpYsK8oBkQF/NjUuHq3y3zcc3ya0="
  }
  ```

- **400 Bad Request**: Invalid request, specifying the field with the error, e.g., "hem is required".
  ```json
  {
    "message": "hem is required"
  }
  ```

- **404 Not Found**: No CEEid identifier found for the provided HEM.
  ```json
  {
    "message": "CEEid identifier not found for the provided HEM"
  }
  ```

- **500 Internal Server Error**: CEEid was unable to respond successfully.
  ```json
  {
    "message": "CEEid was unable to respond successfully"
  }
  ```

### Decryption Integration Steps

We will provide the necessary code to decrypt the CEEid Token. This code will handle the decryption process and ensure the secure retrieval of the XID identifier from the encrypted token.

#### Simple Decryption

##### Scala example:

```scala
    val tokenizer = new Tokenizer(HashMap[Int, String](2 -> "41e6765bb8340ef80598a464e87a5fb3abb209ea1c74f07cec61e34ab7d3e6ff"))
    tokenizer.decrypt("2QlFswDrBAySXB1wc8OsK3YfN09rstsbPpYsK8oBkQF/NjUuHq3y3zcc3ya0=")
```

##### Helper class:

```scala
import java.security.SecureRandom
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.{GCMParameterSpec, SecretKeySpec}
import scala.collection.mutable HashMap

class Tokenizer(keys: HashMap[Int, String]) {

  private val TAG_SIZE = 16
  private val NONCE_SIZE = 12

  def decrypt(token: String): String = {
    val keyID = token.substring(0, 1).toInt
    val tokenBytes = Base64.getDecoder.decode(token.substring(1))
    val keyValue = keys.getOrElse(keyID, throw new Exception("Key not present or null"))

    val key = hexStringToByteArray(keyValue)
    val nonce = tokenBytes slice (0, NONCE_SIZE)
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
