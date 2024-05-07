
How to integrate
----------------

*Disclaimer: the names for the service and for the identifier can be called **PIR** or **xID** (technical name). It's also possible that the service will change it's name with the scale and number of coalition partners.*

##### Prerequisites

-   Partner has the **e-mail address** of the site user or an e-commerce customer and is able to generate **SHA256** value of the normalised e-mail address (**hashed e-mail address** aka **HEM**)
-   Partner has or is able to generate **Local Longterm Cookie** / **Local Longterm ID** (aka **ltid**) - special cookie which value uniquely identifies the browser and is set with the Server Response Header Set-Cookie on the first interaction and is intended to have a very long lifespan (this is optional but very beneficial because of addressing 'non logged-in' users)
-   Partner who is a Publisher is able to integrate via **server to server** integration - using delivered SDK or directly (browser integration is planned and will be available in a future) 
-   Partner who is an Advertiser can pass **HEM** to the tracking events (**ltid** as mentioned is also welcome)

The following steps provide a high-level outline of the workflow intended for integration with the service.

##### Background processes:

-   The Advertiser and/or data provider passes first-party and third-party audience segments to the DSP.
-   The DSP syncs with the PIR Service to receive decryption keys.
-   The DSP refreshes PIR identifiers using the PIR Service and upgrades ID Mappings for stored DMP segments.

##### Steps for each bid/ad impression:

1.  A bid request is passed into the bid stream with the PIR ID token.
2.  The DSP receives the bid request with the PIR ID token from the bid stream.
3.  The DSP:
    -   Decrypts the PIR ID token into a raw PIR ID.
    -   Matches the raw PIR ID to an audience segment.
4.  The DSP sends a personalised bid response to the bid stream.
