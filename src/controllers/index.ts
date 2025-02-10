import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/duplicati/get-access-token";
import type { Request, Response } from "express";
import z from "zod";

const commandLineSchema = z.object({
  type: z.enum([
    "help",
    "example",
    "examples",
    "find",
    "list",
    "delete",
    "backup",
    "restore",
    "repair",
    "purge",
    "list-broken-files",
    "purge-broken-files",
    "compact",
    "create-report",
    "compare",
    "test",
    "verify",
    "test-filters",
    "test-filter",
    "affected",
    "vacuum",
    "system-info",
    "systeminfo",
    "send-mail",
  ]),
});

const commandLine = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const { type } = commandLineSchema.parse(req.body);

    const response = await api({
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: Object.values(type),
    });

    if (!response) {
      throw new Error("Failed to get commandline from Duplicati local server");
    }

    return res.status(200).json({ commandLine: response.data });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getAcknowledgements = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/acknowledgements",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get acknowledgements from Duplicati local server"
      );
    }

    return res.status(200).json({ acknowledgements: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackupDefaults = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/backupdefaults",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get backupdefaults from Duplicati local server"
      );
    }

    return res.status(200).json({ backupdefaults: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackups = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/backups",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get backups from Duplicati local server");
    }

    return res.status(200).json({ backups: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/notifications",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get notifications from Duplicati local server"
      );
    }

    return res.status(200).json({ notifications: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getNotification = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/notifications/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get notification from Duplicati local server");
    }

    return res.status(200).json({ notification: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "DELETE",
      url: `/notifications/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to delete notification from Duplicati local server"
      );
    }

    return res.status(200).json({ notification: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getRemoteControlStatus = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/remotecontrol/status",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get remotecontrol from Duplicati local server"
      );
    }

    return res.status(200).json({ status: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getServerSettings = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/serversettings",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get server settings from Duplicati local server"
      );
    }

    return res.status(200).json({ serverSettings: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getServerState = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/serverstate",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get server state from Duplicati local server");
    }

    return res.status(200).json({ serverState: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const pauseServer = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "POST",
      url: "/serverstate/pause",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to pause server state from Duplicati local server"
      );
    }

    return res.status(200).json({ serverState: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const resumeServer = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "POST",
      url: "/serverstate/resume",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to resume server state from Duplicati local server"
      );
    }

    return res.status(200).json({ serverState: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getSystemInfo = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/systeminfo",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get system info from Duplicati local server");
    }

    return res.status(200).json({ systemInfo: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getTaskInfo = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/task/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get task from Duplicati local server");
    }

    return res.status(200).json({ task: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const stopTask = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "POST",
      url: `/task/${id}/stop`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to stop task from Duplicati local server");
    }

    return res.status(200).json({ task: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const abortTask = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "POST",
      url: `/task/${id}/abort`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to abort task from Duplicati local server");
    }

    return res.status(200).json({ task: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getUiSettings = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();

    const response = await api({
      method: "GET",
      url: "/uisettings",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get uisettings from Duplicati local server");
    }

    return res.status(200).json({ uisettings: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackup = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/backup/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get backup from Duplicati local server");
    }

    return res.status(200).json({ backup: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackupFiles = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/backup/${id}/files`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get backup files from Duplicati local server");
    }

    return res.status(200).json({ backupFiles: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackupLogs = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/backup/${id}/log`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to get backup logs from Duplicati local server");
    }

    return res.status(200).json({ backupLogs: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackupRemoteLogs = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/backup/${id}/remotelog`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get backup remote logs from Duplicati local server"
      );
    }

    return res.status(200).json({ backupRemoteLogs: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getBackupIsActive = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "GET",
      url: `/backup/${id}/isactive`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error(
        "Failed to get backup is active from Duplicati local server"
      );
    }

    return res.status(200).json({ isActive: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const startBackup = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "POST",
      url: `/backup/${id}/start`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to start backup from Duplicati local server");
    }

    return res.status(200).json({ backup: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const runBackup = async (req: Request, res: Response) => {
  try {
    const { accessToken } = await getAccessToken();
    const { id } = req.params;

    const response = await api({
      method: "POST",
      url: `/backup/${id}/run`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response) {
      throw new Error("Failed to run backup from Duplicati local server");
    }

    return res.status(200).json({ backup: response.data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  abortTask,
  commandLine,
  deleteNotification,
  getAcknowledgements,
  getBackup,
  getBackupDefaults,
  getBackupFiles,
  getBackupIsActive,
  getBackupLogs,
  getBackupRemoteLogs,
  getBackups,
  getNotification,
  getNotifications,
  getRemoteControlStatus,
  getServerSettings,
  getServerState,
  getSystemInfo,
  getTaskInfo,
  getUiSettings,
  pauseServer,
  resumeServer,
  runBackup,
  startBackup,
  stopTask,
};
