export const updateUser = async (token: string, username: string) => {
    const request = await fetch("/api/updateUser", {
        method: "POST",
        body: JSON.stringify({
          username,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.status !== 200) {
        throw new Error(
          `Failed to update profile, status code = ${request.status}`
        );
      }
}

export const getUser = async (token: string) : Promise<User | null> => {
    const request = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const user = <User>await request.json();

      return request.status === 200
      ? user
      : null;
}

export interface User {
    address: string;
    username: string;
}