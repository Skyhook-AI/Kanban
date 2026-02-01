import { Text, Button } from '@fluentui/react-components';
import { Layout } from './Layout';

function App() {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Text as="h1" size={800}>Welcome to Kanban Board</Text>
        <Text>This is the initial setup with Fluent UI.</Text>
        <div>
          <Button appearance="primary">Get Started</Button>
        </div>
      </div>
    </Layout>
  );
}

export default App
