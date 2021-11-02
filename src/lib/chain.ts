const chainrequest = async (url: string, body: Record<string, any>) => {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return await r.json();
};

export { chainrequest };
