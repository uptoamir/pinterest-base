import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { Suspense } from "react";
import { NextPage } from "next/types";
import { Button } from "@mui/material";
import {
  ISizeProps,
  SCREENS,
  useWindowSize,
} from "src/core/utils/customHooks/useWindowSize";
import MobileMenu from "../../components/PageMobileHeader";
import strings from "src/translations/translations";
import Icon from "../../components/Icon";
import { USER_TOKEN_KEY } from "src/core/constants";
import { GUIDELINES, LOGIN, BRIEF_LIST } from "src/core/routes";

const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
});

const PageHeader = dynamic(() => import("src/core/components/PageHeader"), {
  suspense: true,
});

export type navigationOption = {
  title: string;
  href: string;
  icon: string;
  id: number;
};

const withPageHeader: (
  Page: NextPage,
  text?: string,
  icon?: any,
  clickFunc?: Array<string>
) => NextPage | void = (Page, text = "", icon = "", clickFunc = []) => {
  const Component: NextPage = (props) => {
    const theme = useTheme();

    const router = useRouter();

		const navigationOptions: Array<navigationOption> = [
			{
				title: "AeroBoard",
				href: BRIEF_LIST,
				icon: "",
				id: 1,
			},
			{
				title: "Guidelines",
				href: GUIDELINES,
				icon: "",
				id: 0,
			},
		];

    const handleLogout = () => {
      localStorage.removeItem(USER_TOKEN_KEY);
      router.replace(LOGIN);
    };

    const Logout = {
      Component: (
        <button
          className="-mb-1 md:mb-0 md:px-2"
          onClick={() => handleLogout()}
        >
          <Icon icon="logout" width={24} height={24} />
        </button>
      ),
    };

		const { width }: ISizeProps = useWindowSize();
		return (
			<div
				className="relative flex flex-col justify-start pb-4 min-h-screen"
				style={{
					backgroundColor: theme.palette.background.default,
				}}
			>
				<div
					className="flex flex-col flex-1"
					style={{
						backgroundColor: theme.palette.background.paper,
					}}
				>
					<Suspense>
						<React.Fragment>
							{width < SCREENS.LG ? (
								<MobileMenu logout={Logout} className="" navigationOptions={navigationOptions} />
							) : (
								<PageHeader
									renderSide={() => (
										<div className="flex items-center justify-between z-1200">
											<div
												className="my-auto cursor-pointer flex items-center m-0 me-8"
												onClick={() => router.push("/")}
											>
												<img src={"/icon-192x192.png"} alt="main logo" className="w-8 me-2" />
												<span className="text-18 font-bold">{strings.app_name}</span>
											</div>
										</div>
									)}
									renderMain={() => (
										<div className="flex items-center">
											{Logout.Component}
											{navigationOptions.map((header: navigationOption) => (
												<Button
													onClick={() => header.href && router.push(header.href)}
													key={header.id}
												>
													<Typography
														color="text.black"
														sx={{ fontWeight: 400 }}
														variant="h1"
														className="px-2 py-1"
													>
														{header.title}
													</Typography>
												</Button>
											))}
										</div>
									)}
								/>
							)}
						</React.Fragment>
					</Suspense>
					<div className={`flex flex-col flex-1 ${width < SCREENS.LG ? "mt-2" : "mt-18"}`}>
						<Page {...props} />
					</div>
				</div>
			</div>
		);
	};

  if (Page.getInitialProps) {
    Component.getInitialProps = async (context) => {
      if (Page.getInitialProps) return Page.getInitialProps(context);
    };
  }

  return Component;
};

export default withPageHeader;
