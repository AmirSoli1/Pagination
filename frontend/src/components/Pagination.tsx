export default function Pagination({
  currentPage,
  onPageChange,
  lastPage,
  getPageNumbers,
}: {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  lastPage: number;
  getPageNumbers: () => number[];
}) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} name="first">
        First
      </button>

      <button
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        name="previous"
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "current-page" : ""}
          onClick={() => onPageChange(pageNumber)}
          name={`page-${pageNumber}`}
          key={pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() =>
          onPageChange(currentPage < lastPage ? currentPage + 1 : lastPage)
        }
        name="next"
        disabled={currentPage === lastPage}
      >
        Next
      </button>
      <button onClick={() => onPageChange(lastPage)} name="last">
        Last
      </button>
    </div>
  );
}
