import { useRoutes } from 'react-router-dom';
import path from './constants/path';
import MainLayout from './Layouts/MainLayout';
import FarmsPage from './pages/FarmsPage';
import DashBoardPage from './pages/DashBoardPage';
import VaultDetail from './pages/VaultDetail';

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '',
            element: <MainLayout />,
            children: [
                {
                    path: path.dashBoard,
                    element: <DashBoardPage />,
                },
                {
                    path: path.farms,
                    element: <FarmsPage />,
                },
                {
                    path: path.vaultDetail,
                    element: <VaultDetail />,
                },
            ],
        },
    ]);
    return routeElements;
};

export default useRouterElements;
