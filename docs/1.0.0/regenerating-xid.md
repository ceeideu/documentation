
Regenerating xID
================

The endpoint "/xid/refresh" is used to refresh information about the current identifier. If an old identifier is sent, the API will return a new identifier.

Request
-------

```
POST /xid/refresh
Content-Type: application/json
x-api-key: d728ef68-92d3-4b2e-bb4f-1f1259a6a972

{
  "xid": "AABK7PSPUUQMP23H",
  "properties": {
    "consent": "true",
    "userAgent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",     "referer": "https://example.com/",    "ip": "0.0.0.0"
  }
}

```

Response
--------

```
{
  "value": "AABK7PSPUUQMP23H",
  "status": "ok"
}

```

In this response, the HTTP status is "200 OK", and the content is in JSON format containing the generated XID ("value") and the operation status ("status").
