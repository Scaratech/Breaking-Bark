// retrieve email
function getEmail() {
    return new Promise((resolve) => {
        chrome.identity.getProfileUserInfo(function(userInfo) {
            resolve(userInfo.email);
        });
    });
}

// validates extension id
const BARK_EXTENSION_IDS = [
    'jcocgejjjlnfddlhpbecfapicaajdibb', // Chrome Monitor production
    'agknpiliocimoiokabdfecmgilemoich', // Chrome Watchdog production
    'pjbpapmfoaplcoaohhdfgdkffdfebmkd', // Edge Monitor production
    'ildciggibamcpacfimbhbkaajnaphljd', // Edge Watchdog production
    'cfjjjelgblfefpldkbpmldjakoohoohb', // Chrome Monitor debug
    'pifhhmbdoikllhpofdknanfcddaajpfk', // Chrome Watchdog debug
    'bnhgbicldegoglomikgnenecboibaepp', // Edge Monitor debug
    'haklcjflhpomkecolmkjfllofddcigab', // Edge Watchdog debug
];

function isValidExtensionId(extensionId) {
    return BARK_EXTENSION_IDS.includes(extensionId);
}

const currentExtensionId = chrome.runtime.id;
if (!isValidExtensionId(currentExtensionId)) {
    throw new Error('Invalid extension ID');
}


// sends POST requests
async function sendBarkReport(title, url) {
    const email = await getEmail();
    const extensionId = chrome.runtime.id;

    const response = await fetch('https://urls.bark.us', {
        method: 'POST',
        headers: {
            'X-Bark-Email': email,
            'X-Bark-Extension': extensionId,
            'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'omit',
        cache: 'no-store',
        body: JSON.stringify({
            title: title,
            url: url,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to send report: ${response.statusText}`);
    }

    return response.json();
}

// sends GET request for extension disposition
async function reportDisposition(disposition) {
    const email = await getEmail();
    const extensionId = chrome.runtime.id;

    const url = new URL('https://www.bark.us/connections/report-disposition');
    url.searchParams.set('email', email);
    url.searchParams.set('disposition', disposition);
    url.searchParams.set('reporter', extensionId);
    url.searchParams.set('extension', extensionId);

    const response = await fetch(url.toString(), {
        method: 'GET',
        credentials: 'omit',
        mode: 'no-cors',
    });

    if (!response.ok) {
        throw new Error(`Failed to report disposition: ${response.statusText}`);
    }

    return response.json();
}

// error handling
async function run() {
    try {
        const reportResponse = await sendBarkReport('Example Title', 'https://example.com');
        console.log('Report sent successfully:', reportResponse);
    } catch (error) {
        console.error('Error sending report:', error);
    }

    try {
        const dispositionResponse = await reportDisposition('enabled');
        console.log('Disposition reported successfully:', dispositionResponse);
    } catch (error) {
        console.error('Error reporting disposition:', error);
    }
}

run();

