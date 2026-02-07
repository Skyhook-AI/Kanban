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

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.colorNeutralBackground1;
    document.body.style.color = currentTheme.colorNeutralForeground1;
  }, [currentTheme]);

  useEffect(() => {
    const loadData = async (bustCache = false) => {
      try {
        const data = await PrdService.loadPrd(bustCache);
        setPrd(data);
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    loadData();

    if (import.meta.hot) {
      import.meta.hot.on('prd-update', () => {
        loadData(true);
      });
    }
  }, []);

  return (
    <FluentProvider theme={currentTheme}>
      <Layout taskCount={prd?.userStories.length} error={error}>
        <Board key={prd ? prd.metadata.updatedAt : 'default'} prd={prd} />
      </Layout>
    </FluentProvider>
  );
}

export default App;
