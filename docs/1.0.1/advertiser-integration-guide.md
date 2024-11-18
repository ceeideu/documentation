### **Advertiser Integration Guide**

To integrate CEEId functionality, advertisers can send user identifiers (DII) to the CEEId service upon user login to generate a unique identifier (xID). This process enables the advertiser to maintain a consistent, secure identifier for each user while respecting privacy and compliance standards.

#### Steps for Integration

1. **Capture DII on User Login**  
   When a user logs in, capture a Directly Identifiable Information (DII) attribute such as the user's email or phone number. This DII will be used to create a secure identifier for the user.

2. **Generate xID with CEEId**  
   Send the captured DII to the `/xid/generate` endpoint to request an xID for the user. This xID acts as a unique, privacy-compliant identifier that can be used for subsequent interactions and tracking.

   - **Endpoint**: `/xid/generate`
   - **Method**: `POST`
   - **Payload**: Include the DII (hashed or otherwise normalized) in the request payload.

3. **Handle the Response**  
   Upon successful request, the `/xid/generate` endpoint will return an xID associated with the provided DII. Store this xID securely for future use.

4. **Tokenize and Store xID**  
   Use the CEEId SDK or designated encryption method to convert the xID into an encrypted token, ensuring secure storage and compliance. This tokenized identifier can then be used for targeted advertising, attribution, and other data processing purposes.

This integration enables advertisers to leverage CEEId’s secure identifiers in a way that aligns with privacy standards, allowing for reliable user recognition across interactions.
