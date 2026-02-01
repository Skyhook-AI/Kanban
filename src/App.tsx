import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useEffect } from 'react';
import { Layout } from './Layout';
import { Board } from './components/Board';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? webDarkTheme : webLightTheme;

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.colorNeutralBackground1;
    document.body.style.color = currentTheme.colorNeutralForeground1;
  }, [currentTheme]);

  return (
    <FluentProvider theme={currentTheme}>
      <Layout>
        <Board />
      </Layout>
    </FluentProvider>
  );
}

export default App;
