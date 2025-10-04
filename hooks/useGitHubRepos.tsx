import { useCallback, useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
  owner: {
    login: string;
  };
}

interface StarredItem {
  starred_at: string;
  repo: Repository;
}

interface UseGitHubReposReturn {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGitHubRepos = (
  username: string = "IsaacSSilva",
): UseGitHubReposReturn => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ownRes, starredRes] = await Promise.all([
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
          { headers: { Accept: "application/vnd.github.v3+json" } },
        ),
        fetch(`https://api.github.com/users/${username}/starred?per_page=100`, {
          headers: { Accept: "application/vnd.github.v3.star+json" },
        }),
      ]);

      if (!ownRes.ok) {
        throw new Error(
          `Erro ao buscar meus repositórios: status ${ownRes.status}`,
        );
      }
      if (!starredRes.ok) {
        throw new Error(
          `Erro ao buscar repositórios estrelados: status ${starredRes.status}`,
        );
      }

      const ownData: Repository[] = await ownRes.json();
      const starredDataRaw: StarredItem[] = await starredRes.json();

      const starredRepos = starredDataRaw.map((item) => item.repo);
      const starredIds = new Set(starredRepos.map((r) => r.id));

      const intersection = ownData.filter((repo) => starredIds.has(repo.id));

      const sorted = intersection.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

      setRepos(sorted);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao buscar repositórios",
      );
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchBoth();
  }, [fetchBoth]);

  return { repos, loading, error, refetch: fetchBoth };
};
