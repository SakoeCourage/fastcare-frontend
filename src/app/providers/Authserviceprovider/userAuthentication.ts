import Api from "app/app/fetch/axiosInstance";
// async function authenticate(username: string, password: string) {
//   console.log("authenticating user");
//   try {
//     const req = await Api.post("/auth/login", { "username": username, "password": password });
//     if (req.status === 200) {
//       console.log(req.data);
//     }
//     return req.data;
//   } catch (error) {
//     if (error) {
//       console.log(error)
//     }
//   }
// }
function authenticate(username: string, password: string) {

  const user = {
    id: "3",
    name: "Test User",
    email: "testuser@example.com"
  };
  return Promise.resolve(user);
}

export const authService = {
  authenticate,
};