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
        partnerId: '123',  // Replace with your assigned partner ID
        type: 'hex',       // Token format (e.g., 'hex' or 'base64')
        value: '3094c65c0dfe352399f58313d1438ff078497e8efacf368a7f9d9189a28bffb7' // Optional static token for testing
      }
    }]
  }
});
```
## Token Behavior

- **Storage**: The token is stored as a cookie named `ceeIdToken`.
- **Expiration**: The cookie is valid for 7 days.
- **Refresh**: A new token will be fetched automatically every 360 seconds.

