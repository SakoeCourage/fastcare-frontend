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
  if(username !== "admin" && password !== "admin") { //(1)
    return null; //(2)
  }

  const user = { 
    id: "9001",
    name: "Web Admin", 
    email: "admin@example.com"}; //(3)

  return user; //(4) 
}

export const authService = {
  authenticate,
};