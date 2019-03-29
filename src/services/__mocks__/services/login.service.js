export const doLogin = ({ username, password }) => {
  if (username === "Error") {
    return Promise.reject("Usuario ou senha estao errados");
  } else {
    return Promise.resolve({ nome: "Admin" });
  }
};
