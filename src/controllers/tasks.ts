import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/duplicati/get-access-token";
import type { Request, Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/tasks",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get tasks from Duplicati local server");
    }

    return res.status(200).json({ tasks: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export { getTasks };
