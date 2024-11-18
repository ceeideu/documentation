### **Obtaining and Encrypting CEEId Identifiers**

1. **Directly Identifiable Information (DII) Access**  
   To create an encrypted CEEId identifier, obtain a Directly Identifiable Information (DII) attribute, such as the user’s email or phone number.

2. **xID Generation**  
   Generate an xID by calling the `/xid/generate` endpoint, passing in the DII as required.

3. **xID Encryption**  
   [Encrypt](./encrypting-xid-into-ceeid.md) the xID using the designated encryption method. This generates a secure CEEId token, which can then be stored as needed.
