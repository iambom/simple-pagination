import { useEffect, useState } from "react";
import PaginationButton from "./PaginationButton";

type Props = {
  totalPage: number;
  currentPage: any;
  setCurrentPage: (page: number) => void;
};

const LIMIT = 10;

const sliceArrayByLimit = (totalPage: number, limit: number) => {
  // [1, 2, ... 14, 15] 토탈 페이지 인덱스 배열 먼저 만들고
  const totalPageArray = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  // 총 15 페이지 나왔으면 한번에 보여줄 limit 개수만큼 끊어서 배열로 만듦
  // [Array(10), Array(5)]
  return Array.from({ length: Math.ceil(totalPage / limit) }, () =>
    totalPageArray.splice(0, limit)
  );
};

const Pagination = ({ totalPage, currentPage, setCurrentPage }: Props) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, LIMIT);

    if (currentPage % LIMIT === 1) {
      // 현재 페이지 배열의 첫 페이지 (1, 11, 21, ...)
      setCurrentPageArray(slicedPageArray[Math.floor(currentPage / LIMIT)]);
    } else if (currentPage % LIMIT === 0) {
      // 현재 페이지 배열의 마지막 페이지  (10, 20, 30, ...)
      setCurrentPageArray(slicedPageArray[Math.floor(currentPage / LIMIT) - 1]);
    } else if (currentPage === totalPage) {
      setCurrentPageArray(slicedPageArray[slicedPageArray.length - 1]);
    }
  }, [currentPage, totalPage]);

  const nextPage = () => {
    if (currentPage !== totalPage) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <PaginationButton
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          맨 앞으로
        </PaginationButton>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          이전
        </PaginationButton>

        {currentPageArray?.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === totalPage}
        >
          다음
        </PaginationButton>
        <PaginationButton
          onClick={() => setCurrentPage(totalPage)}
          disabled={currentPage === totalPage}
        >
          맨 뒤로
        </PaginationButton>
      </ul>
    </nav>
  );
};

export default Pagination;
