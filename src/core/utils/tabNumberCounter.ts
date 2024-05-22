import { NextRouter } from "next/router";

export const tabNumberCounter: (router: NextRouter) => number = (
  router: NextRouter
) => {
  if (router.asPath.split("#").length > 1)
    if (parseInt(router.asPath.split("#")[1]) < 2)
      return parseInt(router.asPath.split("#")[1]);
  return 0;
};
