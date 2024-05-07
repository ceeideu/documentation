Tokenisation
============

1.  The client initiates the process by fetching the necessary keys from the "/keys" endpoint.
2.  Subsequently, the clientsends HEM (Hashed Email) information or refreshes an existing xID to obtain a new xID identifier.
3.  Upon receiving the response with the new xID, the partner encrypts this identifier (locally) using the previously retrieved key.
4.  The result of this process is a token, which is a secure identifier that can be used in the application for various purposes, such as session identification. It must be stored in a browser cookie, local storage, or a global variable for future use.
5.  Additionally, a partner who receives such a token should be capable of decoding it (locally) using the acquired keys, resulting in obtaining the XID identifier.



## Encryption Integration Steps


### Obtaining X-API-KEY and Authentication

Request access token (**API_KEY**) from PIR provider administrator to get access to PIR API. This will allow communication with PIR API.

Note: API_KEY should never be published or exposed to external vendors nor to public user-land and must be kept privately on a server side.

Authentication in the API XID occurs through the HTTP header `x-api-key`, which contains a unique identifier (UUID) for the client. The client must include the correct UUID as the value of this header in every request. An example authentication header: `x-api-key: d728ef68-92d3-4b2e-bb4f-1f1259a6a972`. This identifier ensures security and access control to the resources of the API XID.

### Fetch encryption/decryption keys

The "/keys" endpoint serves as a gateway for accessing encryption and decryption keys required for AES-GCM encryption. These keys are essential for securing sensitive data and ensuring its confidentiality during transmission. This encryption is particularly utilized to create a TOKEN based on the XID identifier. By utilizing this endpoint, clients can retrieve the necessary keys to encrypt and decrypt their data securely, facilitating the creation of the TOKEN based on the XID identifier.

The keys provided by the "/keys" endpoint change on a weekly basis. It is recommended to refresh these keys daily to ensure security and the integrity of the encryption/decryption process.

-   Only Partner's Backend Servers should call **/keys** endpoint
-   Access **/keys **endpoint with your **x-api-key** token as a request header value.
-   The endpoint lists **keys** that should be used to decrypt PIR ID token (from the bid-stream) to obtain raw PIR ID. The first character of the token indicates the key index (1-4) for decryption.
-   There is always only one key selected as a current encryption key
-   Keep refreshing keys periodically (once a day)
-   Keys rotate weekly, with the oldest key being replaced and set as the new encryption key. 
-   Keys should never be published or exposed to external vendors nor to public user-land and must be kept privately on a server side



#### Example Request:

```
GET /xid/keys
Content-Type: application/json
x-api-key: d728ef68-92d3-4b2e-bb4f-1f1259a6a972
```


#### Example Response:

```json
{
  "keys": [
    {
      "id": 1,
      "value": "a335eb4a2afad58b051c140b46c98598821971643a5f14ad15c09c5f9565fb1c",
      "encrypt": false
    },
    {
      "id": 2,
      "value": "9fd396412e47930f1ea237d31c158cde79a2b817b33452148aaea82d3bb9a571",
      "encrypt": false
    },
    {
      "id": 3,
      "value": "a57007dd66207f4f7978067155207ecc13264370ac408737675dba70d2511a2d",
      "encrypt": false
    },
    {
      "id": 4,
      "value": "3193cc0f77f59b1f41f15a415f0ba926ab5a3e51a3d73d0c977687f2ff30885a",
      "encrypt": true
    }
  ]
}
```

#### Encryption / decryption code snippets

Encryption / decryption code snippets will be attached to the documentation. We provide snippets in most popular languages: GoLang, PHP, Python, NodeJS, C#, C++, Java

## Normalization of Email Addresses

-   For Gmail addresses: Remove all dots ('.') from the local part of the address (i.e., the part before '@').
-   For all addresses: Remove any characters including and following a plus ('+') sign in the local part of the address.
-   Trim any leading or trailing spaces from the email address.
-   Convert the entire email address to lowercase.
