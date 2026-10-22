type userAPIRole = "employee" | "manager";

type userAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: userAPIRole;
  };
};
