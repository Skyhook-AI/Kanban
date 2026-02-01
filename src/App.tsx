import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { Layout } from './Layout';
import { Board } from './components/Board';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { theme } = useTheme();
  return (
    <FluentProvider theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
      <Layout>
        <Board />
      </Layout>
    </FluentProvider>
  );
}

export default App;
