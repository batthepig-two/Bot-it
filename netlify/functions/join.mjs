export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const res = await fetch('https://fb.blooket.com/c/firebase/join', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://play.blooket.com',
        'Referer': 'https://play.blooket.com/',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify(body)
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ success: false, msg: 'Blooket returned unexpected response: ' + text.substring(0, 100) })
      };
    }

    return { statusCode: res.status, headers, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, msg: err.message })
    };
  }
};