import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

function Search() {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="flex items-center my-2 mx-auto w-11/12">
      <div className="flex items-center w-full bg-search rounded box-border pr-2.5">
        <input
          className="border-none ml-2.5 h-[39px] w-full bg-search outline-none"
          placeholder="Search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchOutlined />
      </div>
    </div>
  );
}

export default Search;
