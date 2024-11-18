### **Token Decryption Guide**

1. **Key Retrieval**  
   To decrypt tokens, request decryption keys by periodically calling the `/keys/refresh` endpoint. These keys are refreshed weekly to ensure compatibility with encrypted tokens.

2. **Selecting the Appropriate Key**  
   Identify the key version within each token by referencing the token's initial character, which specifies the relevant key. Use the matching key from `/keys/refresh` for decryption.

3. **Extracting the xID Identifier**  
   Once decrypted, the token reveals the `xID` identifier initially assigned by the publisher. This `xID` serves as the unique user identifier and is integral for downstream applications.
