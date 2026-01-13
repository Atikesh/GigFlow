import api from "./api";

const authApi = {
 login: async (data) => {
  const res = await api.post("/auth/login", data);
  return {
    token: res.data.token,
    user: {
      userId: res.data.user._id,
      username: res.data.user.username,
      email: res.data.user.email
    }
  };
}
,

  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  }
};

export default authApi;
