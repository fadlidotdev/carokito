const constantsObject = {
  appName: "CMS Suikocommerce",
  admin: "admin",
};

export type Constant = keyof typeof constantsObject;

const constants = (name: Constant) => constantsObject[name];

export default constants;
