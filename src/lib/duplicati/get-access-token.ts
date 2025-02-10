import { env } from "@/lib/env";

const getAccessToken = async () => {
  const response = await fetch("http://localhost:8200/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Password: env.DUPLICATI_MASTER_PASSWORD,
      RememberMe: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token from Duplicati local server");
  }

  const data = await response.json();

  return { accessToken: data.AccessToken };
};

export { getAccessToken };
