"use client";

import { Link, LoaderCircle } from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";

interface DatalistInputProps {
  username?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function DatalistInput({
  username = "IsaacSSilva",
  onValueChange,
  className = "",
}: DatalistInputProps) {
  const baseUrl = `github.com/${username}`;
  const { repos, loading, error } = useGitHubRepos(username, true);
  
  const [inputValue, setInputValue] = useState<string>(baseUrl);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredRepos, setFilteredRepos] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoiza o array de repositories para evitar recriação a cada render
  const repositories = repos.map(repo => repo.name);

  useEffect(() => {
    // Verifica se tem "/" após o baseUrl
    if (inputValue.startsWith(baseUrl + "/")) {
      const repoQuery = inputValue.substring(baseUrl.length + 1);
      
      if (repoQuery === "") {
        setFilteredRepos(repositories);
        setIsOpen(true);
      } else {
        const filtered = repositories.filter((repo) =>
          repo.toLowerCase().startsWith(repoQuery.toLowerCase())
        );
        setFilteredRepos(filtered);
        
        const exactMatch = filtered.length === 1 && filtered[0].toLowerCase() === repoQuery.toLowerCase();
        setIsOpen(filtered.length > 0 && !exactMatch);
      }
    } else {
      setFilteredRepos([]);
      setIsOpen(false);
    }
  }, [inputValue, baseUrl, repos]); // Usa 'repos' ao invés de 'repositories'

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Atalho Ctrl + / para abrir lista de repos
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const repoNames = repos.map(repo => repo.name);
        setInputValue(baseUrl + "/");
        setFilteredRepos(repoNames);
        setIsOpen(true);
        inputRef.current?.focus();
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.value.length;
            inputRef.current.selectionEnd = inputRef.current.value.length;
          }
        }, 0);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [baseUrl, repos]); // Usa 'repos' ao invés de 'repositories'

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.startsWith(baseUrl)) {
      setInputValue(value);
      setHighlightedIndex(-1);
      if (onValueChange) {
        onValueChange(value);
      }
    }
  };

  const handleRepoClick = (repo: string) => {
    const newValue = `${baseUrl}/${repo}`;
    setInputValue(newValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === baseUrl) {
      e.preventDefault();
      return;
    }

    if (
      !isOpen &&
      filteredRepos.length > 0 &&
      (e.key === "ArrowDown" || e.key === "ArrowUp")
    ) {
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredRepos.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        handleRepoClick(filteredRepos[highlightedIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleRedirect = () => {
    const url = inputValue.startsWith('http') 
      ? inputValue 
      : `https://${inputValue}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Estado de loading
  if (loading) {
    return (
      <div className={`w-full max-w-lg ${className}`}>
        <div className="relative flex ">
          <div
            className="px-5 py-1.5 border border-r-0 
            pr-10 rounded-s-md transition-all font-mono w-full text-zinc-50/25 flex 
            items-center border-zinc-50/15 bg-zinc-900 rounded-md"
          >
            Carregando repositórios...
          </div>
          <div className="min-h-full w-[1px] border border-dashed border-zinc-50/15"/>
          <button 
            type="button"
            disabled
            className="border border-l-0 border-zinc-50/15 bg-zinc-900 text-zinc-50
            px-5 transition-all font-mono rounded-e-md cursor-not-allowed"
          >
            <LoaderCircle className="size-4 text-zinc-50/60 animate-spin"/>
          </button>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className={`w-full max-w-md ${className}`}>
        <div className="relative flex">
          <div
            className="px-5 py-1.5 border border-r-0 border-red-500/30 bg-zinc-900
            pr-10 rounded-s-md transition-all font-mono w-full text-red-400 flex items-center text-sm"
          >
            {error}
          </div>
          <div className="min-h-full w-[1px] border border-dashed border-red-500/30"/>
          <button 
            type="button"
            disabled
            className="border border-l-0 border-red-500/30 bg-zinc-900 text-red-400
            px-5 transition-all font-mono rounded-e-md cursor-not-allowed"
          >
            <Link className="size-4 text-red-400/60"/>
          </button>
        </div>
      </div>
    );
  }

  // Estado normal com dados carregados
  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="relative">
        <label htmlFor="repo-input" className="sr-only">
          Selecione um repositório
        </label>
        <div className="relative flex w-lg">
          <input
            ref={inputRef}
            id="repo-input"
            type="text"
            spellCheck="false" 
            autoCorrect="off" 
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="px-5 py-1.5 border border-r-0 border-zinc-50/15 bg-zinc-900 text-zinc-50
            pr-10 focus:border-zinc-50/35 rounded-s-md focus:outline-none focus:ring-0 
            transition-all font-mono cursor-pointer w-full"
            placeholder={baseUrl}
          />
          <div className="min-h-full w-[1px] border border-dashed border-zinc-50/15"/>
          <button 
            type="button"
            onClick={handleRedirect}
            className="border border-l-0 border-zinc-50/15 bg-zinc-900 text-zinc-50
            px-5 focus:border-zinc-50/35 focus:outline-none focus:ring-0
            transition-all font-mono cursor-pointer rounded-e-md group duration-200"
          >
            <Link className="size-4 text-zinc-50/60 group-hover:text-emerald-500
            transition-all duration-200"/>
          </button>
        </div>

        {/* Dropdown customizado */}
        {isOpen && filteredRepos.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-2 border-[1.5px] border-zinc-50/15 bg-zinc-900 rounded-md 
            shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 
            hover:scrollbar-thumb-zinc-500"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#52525b #27272a'
            }}
          >
            {filteredRepos.map((repo, index) => (
              <div
                key={index}
                onClick={() => handleRepoClick(repo)}
                className={`px-4 py-3 cursor-pointer transition-colors font-mono 
                  ${
                  index === highlightedIndex
                    ? "bg-rose-600 text-white"
                    : "hover:bg-zinc-700 text-zinc-100"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === filteredRepos.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    <span className="text-zinc-400">{baseUrl}/</span>
                    {repo}
                  </span>
                  {inputValue === `${baseUrl}/${repo}` && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isOpen && filteredRepos.length === 0 && inputValue.includes("/") && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-2 border-[1.5px]
            border-zinc-50/15 bg-zinc-900 rounded-md shadow-lg py-1.5 text-center 
            text-zinc-600 font-mono"
          >
            Nenhum repositório encontrado
          </div>
        )}
      </div>
    </div>
  );
}