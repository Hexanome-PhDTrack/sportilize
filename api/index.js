const BASE_URL = "https://sportilize.herokuapp.com/api/v1/";

export const get = (url, params) =>
  fetch(BASE_URL + url, {
    method: "GET",
    ...params,
  });

export const post = async (url, params, body) => {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ...params,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return {
    ok: res.ok,
    ...data,
  };
};

