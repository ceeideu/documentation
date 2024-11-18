### **Encrypting xID into CEEId Token**

To securely encrypt the xID identifier, follow these steps using the CEEId SDK:

1. **Key Retrieval**  
   Ensure the latest decryption keys are obtained by periodically refreshing them via the `/keys/refresh` endpoint.

2. **Generating the xID**  
   Use the `Send` method in the SDK to generate an xID based on the user’s DII (Directly Identifiable Information). This can be done by calling:
   
   ```go
   xid, err := xidClient.Send(context.Background(), hem.FromEmail(email))
   ```

3. **Encrypting xID**  
   Encrypt the generated xID using the `TokenFromXID` method:

   ```go
   token, err := xidClient.TokenFromXID(xid)
   ```

4. **Store the Token**  
   The resulting token can then be stored securely, as required for future transmission.

This process ensures that user identifiers are securely encrypted and ready for integration across compatible environments. You can review further SDK details [here](https://github.com/ceeideu/sdk).
