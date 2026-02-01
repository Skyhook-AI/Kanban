import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';
import { useState, type ReactNode } from 'react';
import { SettingsDialog } from './components/SettingsDialog';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '10px 20px',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: tokens.shadow4,
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  settingsButton: {
    color: tokens.colorNeutralForegroundOnBrand,
    '&:hover': {
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Kanban Board</span>
        <Button
          icon={<Settings24Regular />}
          appearance="subtle"
          className={styles.settingsButton}
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Settings"
        />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};
