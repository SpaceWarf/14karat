import Header from "../Common/Header";
import "./StashSearch.scss";

function StashSearch() {
  return (
    <div className="StashSearch">
      <Header text="Stash Search" decorated />
      <iframe src="https://docs.google.com/spreadsheets/d/15b1qvnB_PEgTlPWvdlTYACErDT9R0FXT2LlOtVu8prU/edit?rm=minimal#gid=0" title="Stash Search Spreadsheet"></iframe>
    </div>
  );
}

export default StashSearch;