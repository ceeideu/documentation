### **Token Decryption Guide**

To decrypt CEEId tokens, follow these steps using the CEEId SDK, which provides built-in support for decryption based on the secure keys obtained through the CEEId API.

#### 1. **Retrieve Decryption Keys**
   - Use the `/keys/refresh` endpoint to periodically obtain the latest set of decryption keys, which are updated weekly.
   - The first character of each CEEId token indicates the version of the key to be used for decryption, allowing you to match the token with the correct key from the refreshed set.

#### 2. **Configure SDK for Decryption**
   - Initialize the SDK with the decryption key set obtained from `/keys/refresh`.
   - Ensure that your environment can securely store and retrieve these keys for token processing.

#### 3. **Decrypt the Token**
   - To decrypt a CEEId token, use the SDK's `DecryptToken` function (or equivalent method in the SDK’s API).
   - Pass the token and the appropriate key version, as indicated by the token’s prefix, to the decryption function.

   Example in Go:
   ```go
   decryptedID, err := sdkClient.DecryptToken(token, keyVersion)
   if err != nil {
       log.Fatalf("Decryption failed: %v", err)
   }
   ```

#### 4. **Obtain xID Identifier**
   - Once decrypted, the token reveals the xID identifier, which represents the unique user identifier initially created by the publisher.

#### 5. **Integrate Decrypted xID**
   - The xID can now be used in downstream applications, such as for user matching or further identity management processes, based on integration needs.

This process enables secure and compliant token decryption for effective identity management. For more detailed SDK instructions, please refer to the [CEEId SDK documentation](https://github.com/ceeideu/sdk).
