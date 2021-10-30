const fetcher = (url: string) => fetch(url).then((res) => res.json());

const postFetcher = <T extends Record<string, any> = {}>(url: string, body: T) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  }).then((res) => res.json());

export { fetcher, postFetcher };
