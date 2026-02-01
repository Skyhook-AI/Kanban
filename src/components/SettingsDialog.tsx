import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { useState, useEffect } from "react";
import { StorageService } from "../services/StorageService";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  successMessage: {
    color: tokens.colorPaletteGreenForeground1,
  },
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
  }
});

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({
  open,
  onOpenChange,
}: SettingsDialogProps) => {
  const styles = useStyles();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTestSuccess, setIsTestSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const settings = StorageService.loadSettings();
      // Use setTimeout to avoid synchronous state update in effect warning
      const timer = setTimeout(() => {
        setWebhookUrl(settings.webhookUrl || "");
        setTestStatus(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSave = () => {
    StorageService.saveSettings({ webhookUrl });
    onOpenChange(false);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
        setTestStatus("Please enter a URL first.");
        setIsTestSuccess(false);
        return;
    }

    try {
      setTestStatus("Sending...");
      setIsTestSuccess(false);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "This is a test message from Kanban Board",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setTestStatus("Webhook sent successfully!");
        setIsTestSuccess(true);
      } else {
        setTestStatus(`Failed to send: ${response.status} ${response.statusText}`);
        setIsTestSuccess(false);
      }
    } catch (error) {
      setTestStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setIsTestSuccess(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent className={styles.content}>
            <div className={styles.field}>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(_, data) => setWebhookUrl(data.value)}
                placeholder="https://example.com/webhook"
              />
            </div>
            
            <div className={styles.field}>
                <Button onClick={handleTestWebhook}>Test Webhook</Button>
                {testStatus && (
                    <div className={isTestSuccess ? styles.successMessage : styles.errorMessage}>
                        {testStatus}
                    </div>
                )}
            </div>

          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
