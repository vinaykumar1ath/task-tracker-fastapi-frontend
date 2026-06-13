import { api } from "./client";
import { UserData } from "../types/api";

export async function login(
  data: UserData
) {
  const response = await api.post(
    "/auth/",
    {
      username: data.username,
      password: data.password
    }
  );

  return response.data;
}

export async function signup(
  data: UserData
) {
  const response = await api.post(
    "/auth/account",
    data
  );

  return response.data;
}

export async function signupAndLogin(
  data: UserData
) {
  await signup(data);

  return login({
    username: data.username,
    password: data.password
  });
}

export async function logout() {
  const response = await api.delete(
    "/auth/"
  );

  return response.data;
}

export async function authCheck() {
  const response = await api.get(
    "/auth/"
  );

  return response.data;
}
