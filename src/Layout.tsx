import { makeStyles, tokens } from '@fluentui/react-components';
import type { ReactNode } from 'react';

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
    boxShadow: tokens.shadow4,
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Kanban Board
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};
