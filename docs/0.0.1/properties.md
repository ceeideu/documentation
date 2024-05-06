
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


d.js User ID Submodule will be provided after the certification process finishes. The module will provide methods for passing xID value directly or provide Cookie / Local Storage name to read the xID value from. The decision to pass the xID value directly or specify a Cookie/Local Storage name for reading the xID value is at the discretion of the integrator. This provides flexibility in how the integration is implemented based on specific use cases or technical requirements.