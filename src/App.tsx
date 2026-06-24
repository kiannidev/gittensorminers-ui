import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { RepositoriesPage } from '@/pages/RepositoriesPage';
import { MinersPage } from '@/pages/MinersPage';
import { MinerDetailPage } from '@/pages/MinerDetailPage';
import { HelpPage } from '@/pages/HelpPage';
import { RepoDetailPage } from '@/pages/RepoDetailPage';
import { PrDetailPage } from '@/pages/PrDetailPage';
import { MyBoardPage } from '@/pages/MyBoardPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="repositories" element={<RepositoriesPage />} />
            <Route path="repositories/:owner/:repoName" element={<RepoDetailPage />} />
            <Route path="prs/:owner/:repoName/:prNumber" element={<PrDetailPage />} />
            <Route path="miners" element={<MinersPage />} />
            <Route path="miners/:githubId" element={<MinerDetailPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="my-board" element={<MyBoardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
