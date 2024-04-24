Glossary
========

-   **PIR: **Official short version name for 'Polish Advertising Identifier'.
-   **xID: **Internal name of our PIR identifier.
-   **PIR ID: **Deterministic identifier of the user used for retargeting and profiling mechanisms.
-   **Token / PIR ID Token:** Encrypted version of xID
-   **HEM:** Normalised and encrypted email representation using SHA-256 (Secure Hash Algorithm 256-bit) a cryptographic hash function.

-   **DSP: **DSP stands for Demand-Side Platform. A DSP is a software platform used by advertisers and agencies to purchase digital advertising space in an automated manner. It allows advertisers to buy ad inventory across multiple ad exchanges and publishers through real-time bidding (RTB) and programmatic advertising.
-   **Publisher**: A publisher refers to a company, organisation, or individual that owns and operates a digital platform where advertising space is available for sale.
-   **Advertiser:** An advertiser is an individual, company, or organisation that pays for advertising space or time to promote their products, services, or brand to a target audience.
-   **DMP:** DMP stands for Data Management Platform. It is a technology platform used by advertisers, publishers, and marketers to collect, organize, analyze, and activate large volumes of data from multiple sources for targeted advertising and marketing campaigns.

-   **ltid: ** Local Longterm Cookie / Local Longterm ID - special cookie which value uniquely identifies the browser and is intended to have a very long lifespan (enabling non-logged users targeting).
-   **Bid stream:** The flow of data in real-time bidding (RTB) advertising environments. In the context of digital advertising, real-time bidding is a process where ad impressions are bought and sold through automated auctions in real time.
-   **EIDS: **EIDs, or external IDs, in the context of real-time bidding (RTB), are unique identifiers associated with various entities involved in the advertising ecosystem. These entities can include publishers, users, devices, and advertisers. EIDs play a crucial role in facilitating the exchange of data and information between different platforms and systems during the RTB process.

-   **Encryption / Tokenisation: **Encryption is the process of converting sensitive information or ordinary data into an unreadable form, called ciphertext, using an algorithm and a secret key. The purpose of encryption is to ensure data confidentiality and security by preventing unauthorised access to the original data.
-   **Decryption:** It is the reverse operation of encryption, which is the process of converting plaintext into ciphertext using an encryption algorithm and a secret key.
-   **AES:** AES stands for Advanced Encryption Standard. It is a symmetric encryption algorithm used to secure sensitive data by converting plaintext into ciphertext. AES is widely adopted and considered one of the most secure encryption algorithms available today.

Overview
========

Characteristics of PIR (Polski Identyfikator Reklamowy - Polish Advertising Identifier)
---------------------------------------------------------------------------------------

Here are just some of the intended benefits for using **PIR**. You can:

-   Upgrade identity of the user with an authenticated and tokenised ID (based on hashed e-mail address).
-   Remove dependency on third-party cookies.
-   Facilitate first-party data activation with a more privacy-conscious standard for ID encryption.
-   Aim to develop future-proof models with deterministic data.
-   Maintain addressable audience targeting.

Addressed use cases
-------------------

-   cross-domain / cross-device frequency capping measurement
-   campaign unique impressions / users measurement
-   attribution
-   retargeting

How to integrate
----------------

*Disclaimer: the names for the service and for the identifier can be called **PIR** or **xID** (technical name). It's also possible that the service will change it's name with the scale and number of coalition partners.*

##### Prerequisites

-   Partner has the **e-mail address** of the site user or an e-commerce customer and is able to generate **SHA256** value of the normalised e-mail address (**hashed e-mail address** aka **HEM**)
-   Partner has or is able to generate **Local Longterm Cookie** / **Local Longterm ID** (aka **ltid**) - special cookie which value uniquely identifies the browser and is set with the Server Response Header Set-Cookie on the first interaction and is intended to have a very long lifespan (this is optional but very beneficial because of addressing 'non logged-in' users)
-   Partner who is a Publisher is able to integrate via **server to server** integration - using delivered SDK or directly (browser integration is planned and will be available in a future) 
-   Partner who is an Advertiser can pass **HEM** to the tracking events (**ltid** as mentioned is also welcome)

The following steps provide a high-level outline of the workflow intended for integration with the service.

Background processes:

-   The Advertiser and/or data provider passes first-party and third-party audience segments to the DSP.
-   The DSP syncs with the PIR Service to receive decryption keys.
-   The DSP refreshes PIR identifiers using the PIR Service and upgrades ID Mappings for stored DMP segments.

Steps for each bid/ad impression:

1.  A bid request is passed into the bid stream with the PIR ID token.
2.  The DSP receives the bid request with the PIR ID token from the bid stream.
3.  The DSP:
    -   Decrypts the PIR ID token into a raw PIR ID.
    -   Matches the raw PIR ID to an audience segment.
4.  The DSP sends a personalised bid response to the bid stream.

Encryption Integration Steps[​](https://unifiedid.com/docs/overviews/overview-dsps#getting-started "Direct link to Getting Started")
====================================================================================================================================

Obtaining X-API-KEY and Authentication
--------------------------------------

Request access token (**API_KEY**) from PIR provider administrator to get access to PIR API. This will allow communication with PIR API.

Note: API_KEY should never be published or exposed to external vendors nor to public user-land and must be kept privately on a server side.

Authentication in the API XID occurs through the HTTP header `x-api-key`, which contains a unique identifier (UUID) for the client. The client must include the correct UUID as the value of this header in every request. An example authentication header: `x-api-key: d728ef68-92d3-4b2e-bb4f-1f1259a6a972`. This identifier ensures security and access control to the resources of the API XID.

Fetch encryption/decryption keys
--------------------------------

The "/keys" endpoint serves as a gateway for accessing encryption and decryption keys required for AES-GCM encryption. These keys are essential for securing sensitive data and ensuring its confidentiality during transmission. This encryption is particularly utilized to create a TOKEN based on the XID identifier. By utilizing this endpoint, clients can retrieve the necessary keys to encrypt and decrypt their data securely, facilitating the creation of the TOKEN based on the XID identifier.

The keys provided by the "/keys" endpoint change on a weekly basis. It is recommended to refresh these keys daily to ensure security and the integrity of the encryption/decryption process.

-   Only Partner's Backend Servers should call **/keys** endpoint
-   Access **/keys **endpoint with your **x-api-key** token as a request header value.
-   The endpoint lists **keys** that should be used to decrypt PIR ID token (from the bid-stream) to obtain raw PIR ID. The first character of the token indicates the key index (1-4) for decryption.
-   There is always only one key selected as a current encryption key
-   Keep refreshing keys periodically (once a day)
-   Keys rotate weekly, with the oldest key being replaced and set as the new encryption key. 
-   Keys should never be published or exposed to external vendors nor to public user-land and must be kept privately on a server side

Example Request:

|

`curl --location ``'https://<pir-xid-service>/keys'` `\`\
`--header ``'x-api-key: 3c232e14-ed94-460f-a591-f279d56161a6'`

|

Example response:

|

`{`\
`"keys"``:[`\
`{`\
`"id"``:1,`\
`"value"``:``"a335eb4a2afad58b051c140b46c98598821971643a5f14ad15c09c5f9565fb1c"``,`\
`"encrypt"``:``false`\
`},`\
`{`\
`"id"``:2,`\
`"value"``:``"9fd396412e47930f1ea237d31c158cde79a2b817b33452148aaea82d3bb9a571"``,`\
`"encrypt"``:``false`\
`},`\
`{`\
`"id"``:3,`\
`"value"``:``"a57007dd66207f4f7978067155207ecc13264370ac408737675dba70d2511a2d"``,`\
`"encrypt"``:``false`\
`},`\
`{`\
`"id"``:4,`\
`"value"``:``"3193cc0f77f59b1f41f15a415f0ba926ab5a3e51a3d73d0c977687f2ff30885a"``,`\
`"encrypt"``:``true`\
`}`\
`]`\
`}`

|

Encryption / decryption code snippets will be attached to the documentation. We provide snippets in most popular languages: GoLang, PHP, Python, NodeJS, C#, C++, Java

Normalization of Email Addresses
================================

-   For Gmail addresses: Remove all dots ('.') from the local part of the address (i.e., the part before '@').
-   For all addresses: Remove any characters including and following a plus ('+') sign in the local part of the address.
-   Trim any leading or trailing spaces from the email address.
-   Convert the entire email address to lowercase.

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

Response codes
==============

Here are the descriptions of key response codes from the "status" field in API responses.

-   ***ok*** Description: Success. XID has been successfully generated.

-   ***noConsent*** Description: No consent given for generating XID. If a request is made with the "consent" property accidentally set to "false" or not set at all, resulting in a "noConsent" status, the request should be repeated with the "consent" property correctly set to "true"

-   ***userBlocked*** Description: The user opted out of the service, and their data should not be processed further. No further requests should be made for that hashed email address. 

Properties
==========

The "properties" field contains additional information or parameters related to the request that do not fit into the standard fields defined in the API interface. This additional information may be specific to a particular request or may contain configuration data that can affect how the request or response is processed. This data is also collected for statistical purposes.

The "properties" field allows for the transmission of diverse data and parameters in API requests, enabling more flexible and personalized use of the API interface.

Required properties:
--------------------

-   **consent**:
    -   Determines whether the partner has obtained consent from the user. The value must be "true" for the request to be processed. Requests lacking the "consent" property will be ignored.

Optional properties - for statistics and monitoring match rate between domains and devices
------------------------------------------------------------------------------------------

-   **userAgent**:
    -   Contains the value of the user's browser user agent. Recommended but not required.
-   **referer**:
    -   Contains the domain or "surface" where the user is navigating. Recommended but not required.
-   **ip**
    -   The IP address of the user. This property is optional and can be included for additional context or tracking purposes.

Tokenisation
============

1.  The client initiates the process by fetching the necessary keys from the "/keys" endpoint.
2.  Subsequently, the clientsends HEM (Hashed Email) information or refreshes an existing xID to obtain a new xID identifier.
3.  Upon receiving the response with the new xID, the partner encrypts this identifier (locally) using the previously retrieved key.
4.  The result of this process is a token, which is a secure identifier that can be used in the application for various purposes, such as session identification. It must be stored in a browser cookie, local storage, or a global variable for future use.
5.  Additionally, a partner who receives such a token should be capable of decoding it (locally) using the acquired keys, resulting in obtaining the XID identifier.

Passing Identifier to Bid Stream
--------------------------------

Partner should inject the tokenized (encrypted) xID into the `eids` object of the Bid/Ad Request. This ensures the xID is included in the bidding process, allowing for targeted ad delivery based on the tokenized user ID. It's also recommended to pass **ltid** in the **eids** object.

The **eids** object should consist of the following parameters:

-   source (it can change in the future): pir.wp.pl
-   id: the tokenized value of the **xID** Identifier | atype: 3
-   id: the tokenized value of the **ltid** Identifier | atype: 1

Proper Prebid.js User ID Submodule will be provided after the certification process finishes. The module will provide methods for passing xID value directly or provide Cookie / Local Storage name to read the xID value from. The decision to pass the xID value directly or specify a Cookie/Local Storage name for reading the xID value is at the discretion of the integrator. This provides flexibility in how the integration is implemented based on specific use cases or technical requirements.