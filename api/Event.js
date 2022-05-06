import { get, post } from "./index";

const BASE_URL = "https://sportilize.herokuapp.com/api/v1/";
export const CreateAnEvent = async (data, LoggedUser) => {
  const res = await fetch(BASE_URL + "events/create", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: LoggedUser.Cookie,
    },

    body: JSON.stringify(data),
  });
  const d = await res.json();
  return { ok: res.ok, ...d };
};

export const GetSports = async () => {
  const res = await fetch(BASE_URL + "sports/get_all_sports", {
    method: "GET",
  });
  const data = await res.json();
  return data.map((s) => s.name);
};

export const GetPlannedEvents = async (User) => {
  const queryParams = {
    uuid: User.uuid
  }
  const params = new URLSearchParams(queryParams).toString();
  return get("events/get_events_to_participate?" + params, undefined);
}

export const GetCreatedEvents = async (LoggedUser) => {
  return get("events/get_organized_by_user", {headers: {Cookie: LoggedUser.Cookie}});
}

export const ParticipateInEvent = async (event, User) => {
  return post("events/participate", null, {userUuid: User.uuid, eventId: event.id})
}

export const WithdrawFromEvent = async (event, User) => {
  return post("events/withdraw", null, {userUuid: User.uuid, eventId: event.id})
}

export const GetInfrastructureNotClosedEvents = async (infrastructure) => {
  return get("events/list_events_not_closed_by_infrastructure?id=" + infrastructure.id, undefined)
}
