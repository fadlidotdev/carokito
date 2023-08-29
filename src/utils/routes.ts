const listOfRoutes = [
  "search",
  "category/politik",
  "news-detail",
  "dashboard",
  "dashboard/login",
  "dashboard/admin",
  "dashboard/admin/create",
  "dashboard/admin/update",
  "dashboard/category",
  "dashboard/category/create",
  "dashboard/category/update",
  "dashboard/post",
  "dashboard/post/create",
  "dashboard/post/update",
  "dashboard/hashtag",
  "dashboard/hashtag/create",
  "dashboard/hashtag/update",
  "dashboard/banner",
] as const;

type Route = (typeof listOfRoutes)[number];

const routesBuilder = (name: Route, id: string | number) => {
  const routes: Partial<{[key in Route]: string}> = {
    "news-detail": "news",
  };

  return "/".concat(routes[name] as string, "/", id.toString()) ?? "/";
};

export const routes = (route: Route, id?: string | number) => {
  if (id) return routesBuilder(route, id);

  return "/".concat(route);
};
