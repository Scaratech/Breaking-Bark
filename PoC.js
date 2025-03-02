const headers = {
    "X-Bark-Email": "tommy12@gmail.com",
    "X-Bark-Extension": "jcocgejjjlnfddlhpbecfapicaajdibb",
    "Content-Type": "application/json;charset=UTF-8",
};

const body = JSON.stringify({
    title: "4chan",
    url: "https://www.4chan.org/",
});

try {
    const res = await fetch("https://urls.bark.us", {
        method: "POST",
        headers: headers,
        body: body,
    });

    if (!res.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    console.log("Response:", data);
} catch (err) {
    console.error("Error:", err.message);
}
