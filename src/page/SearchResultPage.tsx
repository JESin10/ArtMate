import React from "react";
import SearchResult from "./SearchResult";

interface SearchInfo {
  keyword?: string;
  searchMode?: boolean;
  searchResults?: any;
}

export default function SearchResultPage({
  keyword,
  searchMode,
  searchResults,
}: SearchInfo) {
  console.log("searchResults:", searchResults);
  console.log("searchMode:", searchMode);

  return (
    <SearchResult
      searchMode={searchMode}
      keyword={keyword}
      searchResults={searchResults}
    />
  );
}
