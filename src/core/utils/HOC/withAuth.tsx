import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isLogin } from "../isLogin";
import { store } from "src/core/redux/store";
import { setToastrMessage } from "../../redux/slices/toastrSlice";
import { LOGIN } from "src/core/routes";
import strings from "src/translations/translations";

const withAuth = (Component: any) => {
	// eslint-disable-next-line react/display-name
	return (props: any) => {
		const router = useRouter();
		const [ authenticated, setAuthenticated ] = useState(false);

		useEffect(() => {
			if (!isLogin()) {
				router.push(LOGIN);
				store.dispatch(
					setToastrMessage({
						message: strings.error.login,
						type: "info",
					}),
				);
			} else {
				setAuthenticated(true);
			}
		}, []);

		if (authenticated) {
			return <Component {...props} />;
		} else {
			return <></>;
		}
	};
};

export default withAuth;
