import constants from "@/utils/constants";
import {createContext, useContext, useEffect, useState} from "react";

const authContext = createContext<{
  admin: any;
  setAdmin: (user: any) => void;
}>({
  admin: {},
  setAdmin: () => {},
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DashboardAuthContextProvider = ({children}: Props) => {
  // const [accessToken, setAccessToken] = useState<string | null>(null);

  // const {pathname} = useRouter();

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   try {
  //     const token = localStorage.getItem(constants("accessToken")) || "";
  //     setAccessToken(token);
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.warn(
  //       "Error reading local storage with key of " + constants("accessToken"),
  //     );
  //     setAccessToken("");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof accessToken === "string") {
  //     // if (accessToken && pathname !== routes("dashboard/login")) return;
  //     // Router.push(
  //     //   accessToken ? routes("dashboard") : routes("dashboard/login"),
  //     // );
  //   }
  // }, [accessToken, pathname]);

  // const logout = () => {
  //   Router.replace(routes("dashboard/login"));
  // };

  const [admin, setAdmin] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(constants("admin"));

      if (value) setAdmin(JSON.parse(value));
    }
  }, []);

  const handleSetAdmin = (user: any) => {
    localStorage.setItem(constants("admin"), JSON.stringify(user));
    setAdmin(admin);
  };

  return (
    <authContext.Provider value={{admin, setAdmin: handleSetAdmin}}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => useContext(authContext);

export default DashboardAuthContextProvider;
