# Bark API
## Extensions
### `POST https://urls.bark.us`
#### Other
```
credentials: 'omit',
cache: 'no-store'
```
#### Headers
```
X-Bark-Email: *See Below*
X-Bark-Extension: *See Below*
Content-Type: application/json;charset=UTF-8
```

Email:
```js
chrome.identity.getProfileUserInfo(function(userInfo) {
  const email = userInfo.email
}
```

Valid extension IDs:
```js
const BARK_EXTENSION_IDS = [
    'jcocgejjjlnfddlhpbecfapicaajdibb', // Chrome Monitor production
    'agknpiliocimoiokabdfecmgilemoich', // Chrome Watchdog production
    'pjbpapmfoaplcoaohhdfgdkffdfebmkd', // Edge Monitor production
    'ildciggibamcpacfimbhbkaajnaphljd', // Edge Watchdog production
    // TOOD: Look into these, probably useless
    'cfjjjelgblfefpldkbpmldjakoohoohb', // Chrome Monitor debug
    'pifhhmbdoikllhpofdknanfcddaajpfk', // Chrome Watchdog debug
    'bnhgbicldegoglomikgnenecboibaepp', // Edge Monitor debug
    'haklcjflhpomkecolmkjfllofddcigab', // Edige Watchdog debug
];

// or
chrome.runtime.id;
```

#### Body
```json
{
  "title": "Title of Tab",
  "url": "URL"
}
```

#### Used For
Reporting every site you visit

### `GET https://www.bark.us/connections/report-disposition`
#### Other
```
credentials: 'omit',
mode: 'no-cors',
```

#### URL Parameters
```
?email=
&disposition=
&reporter=
&extension=
```

Email:
```js
chrome.identity.getProfileUserInfo(function(userInfo) {
  const email = userInfo.email;
}
```

Valid extension IDs:
```js
// extension
const BARK_EXTENSION_IDS = [
    'jcocgejjjlnfddlhpbecfapicaajdibb', // Chrome Monitor production
    'agknpiliocimoiokabdfecmgilemoich', // Chrome Watchdog production
    'pjbpapmfoaplcoaohhdfgdkffdfebmkd', // Edge Monitor production
    'ildciggibamcpacfimbhbkaajnaphljd', // Edge Watchdog production
    // TOOD: Look into these, probably useless
    'cfjjjelgblfefpldkbpmldjakoohoohb', // Chrome Monitor debug
    'pifhhmbdoikllhpofdknanfcddaajpfk', // Chrome Watchdog debug
    'bnhgbicldegoglomikgnenecboibaepp', // Edge Monitor debug
    'haklcjflhpomkecolmkjfllofddcigab', // Edige Watchdog debug
];

// reporter
chrome.runtime.id;
```

Disposition:
```
disabled - If the extension is disabled
enabled - If the extension is enabled
uninstalled - If the extension is uninstalled
```

#### Used For
Reporting if you disable or uninstall the extension
