"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { useRouter } from "next/navigation";
import type { Post } from "@/sanity/schemaTypes/postType";
import {
  getPosts,
  getPostsWithPagination,
  type PostWithPagination,
} from "@/lib/blog";
import {
  sanitizeSearchInput,
  sanitizeForGroq,
  sanitizeNumber,
} from "@/lib/sanitize";
import { useDebounce } from "@/hooks/use-debounce";

interface UseBlogFiltersProps {
  initialPosts: Post[];
  initialSelectedTags: string[];
  initialSearch: string;
  initialLanguage?: string;
  router: ReturnType<typeof useRouter>;
  enablePagination?: boolean;
  postsPerPage?: number;
}

interface BlogFiltersState {
  posts: Post[];
  selectedTags: string[];
  search: string;
  language: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPosts: number;
  hasMore: boolean;
  isLoadingMore: boolean;
}

interface BlogFiltersActions {
  handleTagsChange: (tagSlugs: string[]) => void;
  handleSearchChange: (value: string) => void;
  handleLanguageChange: (language: string) => void;
  clearFilters: () => void;
  loadMore: () => void;
  goToPage: (page: number) => void;
  refresh: () => void;
}

type UseBlogFiltersReturn = BlogFiltersState & BlogFiltersActions;

export function useBlogFilters({
  initialPosts,
  initialSelectedTags,
  initialSearch,
  initialLanguage = "en",
  router,
  enablePagination = false,
  postsPerPage = 10,
}: UseBlogFiltersProps): UseBlogFiltersReturn {
  // State management
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);
  const [search, setSearch] = useState(initialSearch);
  const [language, setLanguage] = useState(initialLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(initialPosts.length);
  const [hasMore, setHasMore] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchParamsRef = useRef<string>("");

  const debouncedSearch = useDebounce(search, 300);
  const sanitizedPostsPerPage = sanitizeNumber(postsPerPage, 1, 50);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (language !== "en") {
      params.set("language", language);
    }

    if (enablePagination && currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : "/blog";

    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      if (params.toString() !== currentParams.toString()) {
        router.push(newUrl, { scroll: false });
      }
    }
  }, [
    selectedTags,
    debouncedSearch,
    language,
    currentPage,
    router,
    enablePagination,
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const fetchParams = `${selectedTags.join(",")}-${debouncedSearch}-${language}-${currentPage}`;

      if (fetchParams === lastFetchParamsRef.current && posts.length > 0) {
        return;
      }

      lastFetchParamsRef.current = fetchParams;

      setIsLoading(true);
      setError(null);

      try {
        if (enablePagination) {
          const result: PostWithPagination = await getPostsWithPagination({
            tags: selectedTags,
            search: debouncedSearch,
            language,
            page: currentPage,
            limit: sanitizedPostsPerPage,
          });

          setPosts(result.posts);
          setTotalPosts(result.total);
          setHasMore(result.hasMore);
        } else {
          const fetchedPosts = await getPosts({
            tags: selectedTags,
            search: debouncedSearch,
            language,
            limit: 100,
          });

          setPosts(fetchedPosts);
          setTotalPosts(fetchedPosts.length);
          setHasMore(false);
        }
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          console.error("Failed to fetch posts:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch posts"
          );
        }
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    selectedTags,
    debouncedSearch,
    language,
    currentPage,
    enablePagination,
    sanitizedPostsPerPage,
    posts.length,
  ]);

  const loadMore = useCallback(async () => {
    if (!enablePagination || !hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const result: PostWithPagination = await getPostsWithPagination({
        tags: selectedTags,
        search: debouncedSearch,
        language,
        page: currentPage + 1,
        limit: sanitizedPostsPerPage,
      });

      setPosts((prev) => [...prev, ...result.posts]);
      setCurrentPage((prev) => prev + 1);
      setHasMore(result.hasMore);
      setTotalPosts(result.total);
    } catch (err) {
      console.error("Failed to load more posts:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load more posts"
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    enablePagination,
    hasMore,
    isLoadingMore,
    selectedTags,
    debouncedSearch,
    language,
    currentPage,
    sanitizedPostsPerPage,
  ]);

  const goToPage = useCallback((page: number) => {
    const safePage = sanitizeNumber(page, 1);
    setCurrentPage(safePage);
  }, []);

  const handleTagsChange = useCallback((tagSlugs: string[]) => {
    const safeTags = tagSlugs
      .map((tag) => sanitizeForGroq(tag))
      .filter(Boolean);
    setSelectedTags(safeTags);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    const safeSearch = sanitizeSearchInput(value);
    setSearch(safeSearch);
    setCurrentPage(1);
  }, []);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearch("");
    setCurrentPage(1);
    setError(null);
    router.push("/blog");
  }, [router]);

  const refresh = useCallback(() => {
    setError(null);
    lastFetchParamsRef.current = "";
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    posts,
    selectedTags,
    search,
    language,
    isLoading,
    error,
    currentPage,
    totalPosts,
    hasMore,
    isLoadingMore,
    // Actions
    handleTagsChange,
    handleSearchChange,
    handleLanguageChange,
    clearFilters,
    loadMore,
    goToPage,
    refresh,
  };
}
