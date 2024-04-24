
Generating xID
==============

-   Normalize e-mail address
-   Hash normalized e-mail address with SHA256 hashing method
-   Make an API call as showed below

Request
-------

```
POST /xid/generate
Content-Type: application/json
x-api-key: d728ef68-92d3-4b2e-bb4f-1f1259a6a972

{
  "type": "hex",
  "value": "3094c65c0dfe352399f58313d1438ff078497e8efacf368a7f9d9189a28bffb7",
  "properties": {
   "userAgent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",    "referer": "https://example.com/",   "ip": "0.0.0.0"
  }
}

```

Response
--------

The response from the "generate" endpoint contains the generated XID and the operation status.

```
{
  "value": "AABK7PSPUUQMP23H",
  "status": "ok"
}

```


Response codes
==============

Here are the descriptions of key response codes from the "status" field in API responses.

-   ***ok*** Description: Success. XID has been successfully generated.

-   ***noConsent*** Description: No consent given for generating XID. If a request is made with the "consent" property accidentally set to "false" or not set at all, resulting in a "noConsent" status, the request should be repeated with the "consent" property correctly set to "true"

-   ***userBlocked*** Description: The user opted out of the service, and their data should not be processed further. No further requests should be made for that hashed email address. 
