import { makeStyles, tokens, Button, Switch } from '@fluentui/react-components';
import { Settings24Regular, WeatherMoon24Regular, WeatherSunny24Regular } from '@fluentui/react-icons';
import { useState, type ReactNode } from 'react';
import { SettingsDialog } from './components/SettingsDialog';
import { useTheme } from './contexts/ThemeContext';

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
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  themeIcon: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

interface LayoutProps {
  children: ReactNode;
  taskCount?: number;
  error?: string;
}

export const Layout = ({ children, taskCount, error }: LayoutProps) => {
  const styles = useStyles();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Kanban Board</span>
          {taskCount !== undefined && (
            <span style={{ fontSize: '14px', opacity: 0.8 }}>
              {taskCount} tasks
            </span>
          )}
          {error && (
             <span style={{ fontSize: '14px', color: tokens.colorPaletteRedForeground1 }}>
               Error: {error}
             </span>
          )}
        </div>
        <div className={styles.controls}>
          <WeatherSunny24Regular className={styles.themeIcon} />
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <WeatherMoon24Regular className={styles.themeIcon} />
          <Button
            icon={<Settings24Regular />}
            appearance="subtle"
            className={styles.settingsButton}
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Settings"
          />
        </div>
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
