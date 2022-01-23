import "./Paginator.scss";

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToPage: (num: number) => void;
}

const Paginator = ({ currentPage, totalPages, onNext, onPrev, onGoToPage }: Props) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="paginator">
      <div className={`prev-btn ${isPrevDisabled ? "disabled" : ""}`} onClick={!isPrevDisabled ? onPrev : null}>Previous</div>
      <div className="pages">
        {Array.apply(null, Array(5)).map((_, idx) => {
          const pageNum = currentPage <= 2 ? idx + 1 : (currentPage - (2 - idx));
          if (pageNum > totalPages)
            return;

          return (
            <span
              key={idx.toString()}
              className={`page-num ${pageNum === currentPage ? "current-page" : ""}`}
              onClick={() => onGoToPage(pageNum)}>
              {pageNum}
            </span>
          );
        })}
      </div>
      <div className={`next-btn ${isNextDisabled ? "disabled" : ""}`} onClick={!isNextDisabled ? onNext : null}>Next</div>
    </div>
  );
};

export default Paginator;
