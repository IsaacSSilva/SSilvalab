"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface DatalistInputProps {
  username?: string;
  repositories?: string[];
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function DatalistInput({
  username = "IsaacSSilva",
  repositories = [
    "Components",
    "Portfolio",
    "API-Project",
    "React-Utils",
    "TypeScript-Helpers",
    "NextJS-Starter",
    "UI-Library",
    "Auth-System",
    "Database-Manager",
    "API-Gateway"
  ],
  onValueChange,
  className = "",
}: DatalistInputProps) {
  const baseUrl = `github.com/${username}`;
  const [inputValue, setInputValue] = useState<string>(baseUrl);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredRepos, setFilteredRepos] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se tem "/" após o baseUrl
    if (inputValue.startsWith(baseUrl + "/")) {
      const repoQuery = inputValue.substring(baseUrl.length + 1); // Pega o texto após a "/"
      
      if (repoQuery === "") {
        // Se digitou apenas "/", mostra todos os repos
        setFilteredRepos(repositories);
        setIsOpen(true);
      } else {
        // Filtra repos que começam com o que foi digitado
        const filtered = repositories.filter((repo) =>
          repo.toLowerCase().startsWith(repoQuery.toLowerCase())
        );
        setFilteredRepos(filtered);
        
        // Só abre se houver opções filtradas
        // Fecha se completou exatamente um repo e não há outros com o mesmo prefixo
        const exactMatch = filtered.length === 1 && filtered[0].toLowerCase() === repoQuery.toLowerCase();
        setIsOpen(filtered.length > 0 && !exactMatch);
      }
    } else {
      // Se não tem "/", não mostra nada
      setFilteredRepos([]);
      setIsOpen(false);
    }
  }, [inputValue, baseUrl, repositories]);

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
        setInputValue(baseUrl + "/");
        setFilteredRepos(repositories);
        setIsOpen(true);
        inputRef.current?.focus();
        // Coloca o cursor no final
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
  }, [baseUrl, repositories]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Impede que apague o baseUrl
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
    // Impede backspace de apagar além do baseUrl
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

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="relative">
        <label htmlFor="repo-input" className="sr-only">
          Selecione um repositório
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            id="repo-input"
            type="text"
            spellcheck="false" 
            autocorrect="off" 
            autocomplete="off"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="px-5 py-1.5 border border-zinc-50/15 bg-zinc-900 text-zinc-50
            pr-10 focus:border-zinc-50/35 rounded-sm focus:outline-none focus:ring-0 
            transition-all font-mono cursor-pointer w-xl"
            placeholder={baseUrl}
            autoComplete="off"
          />
        </div>

        {/* Dropdown customizado */}
        {isOpen && filteredRepos.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto
            scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#52525b #27272a'
            }}
          >
            {filteredRepos.map((repo, index) => (
              <div
                key={index}
                onClick={() => handleRepoClick(repo)}
                className={`px-4 py-3 cursor-pointer transition-colors font-mono ${
                  index === highlightedIndex
                    ? "bg-emerald-600 text-white"
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
            className="absolute z-10 w-full mt-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-lg p-4 text-center text-zinc-400 font-mono"
          >
            Nenhum repositório encontrado
          </div>
        )}
      </div>
    </div>
  );
}