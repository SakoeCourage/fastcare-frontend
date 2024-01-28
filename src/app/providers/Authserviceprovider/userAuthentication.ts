import Api from "app/app/fetch/axiosInstance";
import { httpUserResponse } from "../../../../next-auth";

async function authenticate(username: string, password: string): Promise<httpUserResponse | null> {
  return new Promise(
    async (resolve, reject) => {
      try {
        if (username == null && password == null) throw new Error("username and password are required");

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);
        resolve(data);
      } catch (error) {
        return reject(error)
      }
    }
  );

}

export const authService = {
  authenticate,
};