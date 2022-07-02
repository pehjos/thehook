import { atom } from "recoil";

export const handleUserState = atom({
  key: "handleUserState",
  default: false,
});

export const getUserState = atom({
  key: "getPostState",
  default: {},
});

export const useSSRUserState = atom({
  key: "useSSRUserState",
  default: true,
});
