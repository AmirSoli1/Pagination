export default function Pagination({
  currentPage,
  onPageChange,
  lastPage,
}: {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  lastPage: number;
}) {
  const getPageNumbers = () => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    } else if (currentPage < 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= 3 && currentPage <= lastPage - 2) {
      return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else {
      return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }
  };

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
