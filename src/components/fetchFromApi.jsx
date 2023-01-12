export async function fetchFromApi(path, options = {}) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`;
  const result = await fetch(url, options);
  const json = await result.json();

  if (result.ok) {
    return json;
  }

  // toast(`${result.status} - ${json.message}`);
  throw new Error(result.status + " - " + json.message);
}
