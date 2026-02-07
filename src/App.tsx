import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { Layout } from './Layout';
import { Board } from './components/Board';
import { useTheme } from './contexts/ThemeContext';
import { PrdService } from './services/PrdService';
import type { Prd } from './types/prd';

function App() {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? webDarkTheme : webLightTheme;
  const [prd, setPrd] = useState<Prd | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [lastSynced, setLastSynced] = useState<Date | undefined>(undefined);

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.colorNeutralBackground1;
    document.body.style.color = currentTheme.colorNeutralForeground1;
  }, [currentTheme]);

  useEffect(() => {
    const loadData = async (bustCache = false) => {
      try {
        const data = await PrdService.loadPrd(bustCache);
        setPrd(data);
        setLastSynced(new Date());
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    loadData();

    // Listen for manual PRD file loads
    const handleLocalLoad = () => loadData(true);
    window.addEventListener('prd-local-load', handleLocalLoad);

    if (import.meta.hot) {
      import.meta.hot.on('prd-update', () => {
        loadData(true);
      });
    }

    return () => {
      window.removeEventListener('prd-local-load', handleLocalLoad);
    };
  }, []);

  return (
    <FluentProvider theme={currentTheme}>
      <Layout taskCount={prd?.userStories.length} error={error} lastSynced={lastSynced}>
        <Board key={prd ? prd.metadata.updatedAt : 'default'} prd={prd} />
      </Layout>
    </FluentProvider>
  );
}

export default App;
