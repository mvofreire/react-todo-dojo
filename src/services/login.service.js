import Axios from "axios";

export const doLogin = ({ username, password }) => {
  return Axios.post("ENDPOINT", { username, password }).then(
    ({ data }) => data
  );
};
