import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/core/redux/store";
import classnames from "classnames";
import { navigationOption } from "src/core/utils/HOC/withPageHeader";
import MobileMenuNavigation from "./MobileMenuNavigation";
import Icon from "../Icon";
import { showMenuMobileHandler } from "src/core/redux/slices/appConfigSlice";
import strings from "src/translations/translations";

interface Logout {
  Component: JSX.Element;
}

interface IMobileMenuProps {
  logout: Logout;
  navigationOptions: navigationOption[];
  className?: string;
}

const MobileMenu: React.FC<IMobileMenuProps> = ({
  logout,
  navigationOptions,
  className,
}) => {
  const openMenuMobile = useSelector(
    (s: RootState) => s.appConfigSlice.menuMobile
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenMenuMobile = () => {
    dispatch(showMenuMobileHandler());
  };

  return (
    <div
      className={classnames(
        "w-full flex justify-between items-center shadow-md z-1200 top-0 right-0 bg-background-primary px-4 xs:px-6 sm:px-8 md:px-16 lg:px-24 overflow-hidden h-20",
        className ?? ""
      )}
    >
      
      <MobileMenuNavigation
        open={openMenuMobile}
        handleClose={() => handleOpenMenuMobile()}
        navigationOptions={navigationOptions}
      />
      <div className="flex w-full items-center justify-between z-1200">
        <div className="flex justify-between space-s-6 items-center">
          {logout.Component}
          <button onClick={() => handleOpenMenuMobile()}>
            <Icon icon={"list-unordered"} size={22} />
          </button>
        </div>
        <div
          className="my-auto cursor-pointer flex items-center m-0"
          onClick={() => router.push("/")}
        >
          <span className="text-18 font-bold mx-2">{strings.app_name}</span>
          <img src={"/icon-192x192.png"} alt="main logo" className="w-8" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
