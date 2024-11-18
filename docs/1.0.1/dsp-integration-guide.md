### **DSP Integration Guide**

When a bid request is received, the DSP must handle the CEEId token included in the `EIDs` (Extended Identifiers) field as follows:

1. **Retrieve the CEEId Token**  
   Extract the CEEId token from the `EIDs` field within the bid request. This token represents an encrypted identifier and requires decryption before use.

2. **Decrypt the CEEId Token**  
   Decrypt the CEEId token to reveal the xID identifier. Use the appropriate decryption key based on the token's initial character, which specifies the correct key version. Ensure the keys are current by periodically calling the `/keys/refresh` endpoint, as decryption keys are refreshed weekly.

3. **Utilize the xID Identifier**  
   Once decrypted, the xID identifier is accessible and ready for further processing. The DSP can now use this identifier for user matching, targeting, or any other approved functions within its bidding logic.

This integration process ensures that DSPs can securely handle CEEId tokens while adhering to privacy standards and maintaining compatibility with programmatic advertising workflows.
