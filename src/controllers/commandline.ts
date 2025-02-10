import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/duplicati/get-access-token";
import type { Request, Response } from "express";

const commandLine = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/commandline",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get commandLine from Duplicati local server");
    }

    return res.status(200).json({ commandLine: response.data });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { commandLine };
