import useScrollTop from './hooks/useScrollTop';
import useRouterElements from './useRouterElements';

function App() {
    const routeElements = useRouterElements();
    useScrollTop();
    return <div>{routeElements}</div>;
}

export default App;
