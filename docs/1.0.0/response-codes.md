
Response codes
==============

Here are the descriptions of key response codes from the "status" field in API responses.

-   ***ok*** Description: Success. XID has been successfully generated.

-   ***noConsent*** Description: No consent given for generating XID. If a request is made with the "consent" property accidentally set to "false" or not set at all, resulting in a "noConsent" status, the request should be repeated with the "consent" property correctly set to "true"

-   ***userBlocked*** Description: The user opted out of the service, and their data should not be processed further. No further requests should be made for that hashed email address. 
