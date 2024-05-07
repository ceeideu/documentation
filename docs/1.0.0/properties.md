
Properties
==========

The "properties" field contains additional information or parameters related to the request that do not fit into the standard fields defined in the API interface. This additional information may be specific to a particular request or may contain configuration data that can affect how the request or response is processed. This data is also collected for statistical purposes.

The "properties" field allows for the transmission of diverse data and parameters in API requests, enabling more flexible and personalized use of the API interface.

Required properties:
--------------------

-   **consent**:
    -   Determines whether the partner has obtained consent from the user. The value must be "true" for the request to be processed. Requests lacking the "consent" property will be ignored.
