# Standalone Integration for Publishers (no `Prebid.js`)

This guide describes how to generate and store a ceeId token directly on your website using a lightweight JavaScript snippet. This approach is suitable when Prebid.js is not used or when more control over token generation is required.

## Integration Steps

### 1. Include the `CEEID` Snippet

Embed the following script block in the `<head>` of your webpage:

```html
<script>
  const CEEID = (function () {
    let config = {};

    function getCookie(name) {
      if (!name) return;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days, domain) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
      }
      const domainAttribute = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=${value || ''}${expires}; path=/` + domainAttribute;
    }

    function getValue(location) {
      if (location.type === 'cookie') {
        return getCookie(location.name);
      } else if (location.type === 'localstorage') {
        return localStorage.getItem(location.name);
      }
      return null;
    }

    function getTopDomain() {
      const hostname = window.location.hostname;
      const parts = hostname.split('.').reverse();
      if (parts.length >= 2) {
        return `${parts[1]}.${parts[0]}`;
      }
      return hostname;
    }

    function storeToken(token) {
      const destination = config.destination || { type: 'cookie', name: 'ceeidToken' };
      const topDomain = getTopDomain();
      if (destination.type === 'cookie') {
        setCookie(destination.name, token, 365, topDomain);
      } else if (destination.type === 'localStorage') {
        window.localStorage.setItem(destination.name, token);
      }
    }

    function sendRequest() {
      const payload = {
        publisherId: config.publisherId,
        type: config.value.name,
        value: getValue(config.value),
        properties: {
          consent: getValue(config.consent),
        },
      };

      fetch('https://ceeid.eu/api/token/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            storeToken(data.value);
          } else {
            throw new Error('Failed to generate token');
          }
        })
        .catch(error => {
          if (config.onError) {
            config.onError(error);
          } else {
            console.error('Error:', error);
          }
        });
    }

    return {
      init(userConfig) {
        const { destination, publisherId } = userConfig;
        const { name } = destination;
        const ceeIdToken = getCookie(name) || getCookie('ceeidToken');

        if (ceeIdToken) return;
        if (!publisherId) throw new Error('publisherId is required');

        config = userConfig;
        sendRequest();
      },
    };
  }());

  CEEID.init({
    partnerId: '123', // Replace with your assigned partner ID
    value: { type: 'cookie', name: 'email_hash' },
    consent: { type: 'cookie', name: 'consent' },
    destination: { type: 'cookie', name: 'ceeidToken' },
    onError(error) {
      console.error('Error:', error);
    },
  });
</script>
```

---

## What It Does

- Sends a token generation request to `ceeid.eu`
- Uses user ID and consent from `document.cookie`
- Stores the generated token as a cookie (`ceeidToken`)
- Token persists for **365 days** by default
