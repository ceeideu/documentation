### **Obtaining and Encrypting CEEId Identifiers for Publishers**

1. **User Data Access**: Publishers must first obtain a Directly Identifiable Information (DII) attribute, such as the user’s email or phone number.

2. **Generate CEEId Identifier (xID)**: On user visits, call the `/xid/generate` endpoint, passing the user’s DII to receive an xID in response.

3. **Encrypt xID**: Encrypt the xID using the designated encryption method provided in a separate documentation section. This encryption yields the CEEId token.

4. **Set CEEId Token**: Save the CEEId token in the user’s cookie (e.g., `ceeid-token`), allowing it to be transmitted to DSPs via a Prebid.js module (further documented in a dedicated section).
