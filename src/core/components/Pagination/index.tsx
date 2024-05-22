import React, { FC } from "react";
import classnames from "classnames";
import {
  DOTS,
  usePagination,
} from "src/core/utils/customHooks/paginationHooks";
import Icon from "../Icon";
import { useTheme } from "@mui/material";

interface IPaginationProps {
  onPageChange: (page: number) => void;
  siblingCount: number;
  currentPage: number;
  count: number;
  className?: string;
  disable?: boolean;
}

const paginationItemsStyle =
  "p-1 xxs:p-2 h-7 min-w-7 xxs:h-9 xxs:min-w-9 text-center my-auto mx-0.5 flex justify-center box-border items-center rounded-full cursor-pointer noselect";
const Pagination: FC<IPaginationProps> = ({
  onPageChange,
  siblingCount = 1,
  currentPage,
  count,
  className,
  disable = false,
}) => {
  // const { width : widthMain }: ISizeProps = useWindowSize();
  // const [width, setWidth] = useState(widthMain)

  const paginationRange = usePagination({
    count,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    if (!disable) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (!disable) {
      onPageChange(currentPage - 1);
    }
  };

  const theme = useTheme();

  const lastPage = paginationRange
    ? paginationRange[paginationRange?.length - 1]
    : 1;
  return (
    <div
      className={classnames(
        "py-1 px-2 primary-rounded-box w-fit dir",
        className
      )}
    >
      <ul className="flex list-none text-12 dir-ltr">
        <li
          className={classnames(
            "flex p-1 justify-center items-center cursor-pointer",
            currentPage === 1
              ? "pointer-events-none hover:bg-transparent hover:cursor-default"
              : ""
          )}
          style={{ color: theme.palette.text.black }}
          onClick={onPrevious}
        >
          <Icon
            icon={"arrow-left"}
            size={20}
            className={classnames(
              currentPage === 1 ? "before:border-secondry-fade" : ""
            )}
          />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={index}
                className={classnames(
                  paginationItemsStyle,
                  "hover:bg-transparent hover:cursor-default"
                )}
                style={{ color: theme.palette.text.black }}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames(
                paginationItemsStyle,
                pageNumber === currentPage
                  ? "bg-primary text-white"
                  : "hover:bg-borders-primary text-black"
              )}
              onClick={() => {
                if (!disable) onPageChange(parseInt(pageNumber.toString()));
              }}
            >
              {pageNumber.toString()}
            </li>
          );
        })}
        <li
          className={classnames(
            "flex p-1 justify-center items-center cursor-pointer",
            currentPage === lastPage
              ? "pointer-events-none hover:bg-transparent hover:cursor-default"
              : ""
          )}
          style={{ color: theme.palette.text.black }}
          onClick={onNext}
        >
          <Icon
            icon={"arrow-right"}
            size={20}
            className={classnames(
              currentPage === lastPage ? "before:border-secondry-fade" : ""
            )}
          />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
