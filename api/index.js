const BASE_URL = "https://sportilize.herokuapp.com/api/v1/";
const LyonApi =
  "https://download.data.grandlyon.com/ws/grandlyon/adr_voie_lieu.adrequipsportpct/all.json?maxfeatures=100&start=1";

export const get = (url, params) =>
  fetch(BASE_URL + url, {
    method: "GET",
    ...params,
  });

export const deleteReq = async(url, params, body) => {
  const res = await fetch(BASE_URL + url, {
    method: "DELETE",
    ...params,
    headers: {
      ...(params && params.headers),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  try {
    const data = await res.json();
    return {
      ok: res.ok,
      ...data,
    };
  } catch (e) {
    return res;
  }
}

export const put = async (url, params, body) => {
  const res = await fetch(BASE_URL + url, {
    method: "PUT",
    ...params,
    headers: {
      ...(params && params.headers),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  try {
    const data = await res.json();
    return {
      ok: res.ok,
      ...data,
    };
  } catch (e) {
    return res;
  }
}

export const post = async (url, params, body) => {
  const res = await fetch(BASE_URL + url, {
    credentials: "include",
    method: "POST",
    ...params,
    headers: {
      ...(params && params.headers),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  try {
    const data = await res.json();
    return {
      ok: res.ok,
      Cookie: res.headers.map["set-cookie"],
      ...data,
    };
  } catch (e) {
    return res;
  }
};

export const getFromLyon = (url, params) =>
  fetch(LyonApi, {
    method: "GET",
  });
