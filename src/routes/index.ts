import {
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
} from "@/controllers/index";
import { Router } from "express";

const indexRoute = Router();

indexRoute.post("/task/:id/abort", abortTask);
indexRoute.delete("/notifications/:id", deleteNotification);
indexRoute.get("/acknowledgements", getAcknowledgements);
indexRoute.get("/backupdefaults", getBackupDefaults);
indexRoute.get("/backups", getBackups);
indexRoute.get("/backup/:id", getBackup);
indexRoute.get("/backup/:id/files", getBackupFiles);
indexRoute.get("/backup/:id/logs", getBackupLogs);
indexRoute.get("/backup/:id/remotelogs", getBackupRemoteLogs);
indexRoute.get("/backupisactive", getBackupIsActive);
indexRoute.get("/notification", getNotification);
indexRoute.get("/notifications", getNotifications);
indexRoute.post("/pause", pauseServer);
indexRoute.get("/remotecontrolstatus", getRemoteControlStatus);
indexRoute.post("/resume", resumeServer);
indexRoute.post("/runbackup", runBackup);
indexRoute.get("/serverstate", getServerState);
indexRoute.get("/serversettings", getServerSettings);
indexRoute.post("/startbackup", startBackup);
indexRoute.post("/stop", stopTask);
indexRoute.get("/systeminfo", getSystemInfo);
indexRoute.get("/taskinfo", getTaskInfo);
indexRoute.get("/uisettings", getUiSettings);
indexRoute.post("/commandline", commandLine);

export { indexRoute };
