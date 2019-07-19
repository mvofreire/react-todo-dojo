export const doLogin = ({ username, password }) => {
  if (username === "user-error") {
    return Promise.reject("Erro de requisicao");
  } else {
    return Promise.resolve({ id: 123 });
  }
};
