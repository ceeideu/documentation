# Prebid.js Integration for Publishers

This guide describes how to configure the `ceeId` user ID module in Prebid.js using the `userIds` array. This configuration enables client-side identity resolution using ceeId tokens.

## Configuration

Add the `ceeId` entry to the `userSync.userIds` array in your Prebid.js setup:

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'ceeId',
      storage: {
        type: 'cookie',
        name: 'ceeIdToken',
        expires: 7,
        refreshInSeconds: 360
      },
      params: {
        partnerId: '123',         // Replace with your assigned partner ID
        type: 'email_hash',       // Specify the type of identifier
        value: 'b2f0db1687bcf76934a423b42c3e7c3b76ab72046afda7f71f4be19ddc843589', 
      }
    }]
  }
});
```
## Token Behavior

- **Storage**: The token is stored as a cookie named `ceeIdToken`.
- **Expiration**: The cookie is valid for 7 days.
- **Refresh**: A new token will be fetched automatically every 360 seconds.

