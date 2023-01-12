import { toast } from "react-toastify";

export async function fetchFromApi(path, options = {}) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`;
  const result = await fetch(url, options);
  const json = await result.json();

  if (result.ok) {
    return json;
  } else if (result.status == 500) {
    toast.error(`500 - Oops, something went wrong!`);
  } else {
    toast.error(`Oops! An error occured.${result.status} - ${json.message}`);
  }
}
