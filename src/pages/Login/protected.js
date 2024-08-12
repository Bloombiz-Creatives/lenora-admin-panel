import { getLocalStore } from "../../utils";

export const auth = () => {
  const token = getLocalStore('accessToken');
  if (token) {
    return true
  }
}