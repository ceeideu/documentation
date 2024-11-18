### **Publisher Server-Side Integration**

1. **Key Refreshing**  
   Publishers must periodically call the `/keys/refresh` endpoint to maintain an up-to-date set of decryption keys. These keys are refreshed weekly and are essential for proper token handling.

2. **DII Submission**  
   Upon obtaining Directly Identifiable Information (DII) (e.g., email or phone number), submit it to the `/xid/generate` endpoint. This returns the `xID` identifier associated with the user.

3. **xID Encryption**  
   [Encrypt](./encrypting-xid-into-ceeid-token.md) the xID using the designated encryption method. This generates the secure CEEId token.

4. **Token Storage**  
   Store the CEEId token (e.g., in a cookie such as `ceeid-token`) for subsequent use.

5. **Token Transmission**  
   The CEEId token can then be transmitted via the [Prebid.js](./prebid-integration-for-publishers.md) module as needed for downstream processes.
