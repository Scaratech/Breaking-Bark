const headers = {
    "X-Bark-Email": "email@domain.com",
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
        throw new Error(`Error: ${res.status}`);
    }

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    console.log("Response:", data);
} catch (err) {
    console.error("Error:", err.message);
}
