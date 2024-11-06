### **Prebid Integration for Publishers**

1. **Install the CEEId Prebid Module**  
   Publishers should install the [CEEId Prebid module](https://docs.prebid.org/dev-docs/modules/userid-submodules/ceeIdSystem.html), which facilitates the secure handling of user identifiers during bidding.

2. **Configure Token Location**  
   Configure the module to recognize where the CEEId tokens are stored (e.g., a cookie like `ceeid-token`).

3. **Automated Token Transmission**  
   Once configured, the CEEId module will automatically send tokens in the `EIDs` field of each bid request, streamlining identity transmission during ad auctions.
