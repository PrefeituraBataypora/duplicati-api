import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/duplicati/get-access-token";
import type { Request, Response } from "express";

const checkUpdates = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "POST",
      url: "/updates/check",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get updates from Duplicati local server");
    }

    return res.status(200).json({ updates: response.data });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { checkUpdates };
