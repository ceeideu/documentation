Passing Identifier to Bid Stream
============

Partner should inject the tokenized (encrypted) xID into the `eids` object of the Bid/Ad Request. This ensures the xID is included in the bidding process, allowing for targeted ad delivery based on the tokenized user ID. It's also recommended to pass **ltid** in the **eids** object.

The **eids** object should consist of the following parameters:

-   source (it can change in the future): pir.wp.pl
-   id: the tokenized value of the **xID** Identifier | atype: 3
-   id: the tokenized value of the **ltid** Identifier | atype: 1

Proper Prebid.js User ID Submodule will be provided after the certification process finishes. The module will provide methods for passing xID value directly or provide Cookie / Local Storage name to read the xID value from. The decision to pass the xID value directly or specify a Cookie/Local Storage name for reading the xID value is at the discretion of the integrator. This provides flexibility in how the integration is implemented based on specific use cases or technical requirements.
