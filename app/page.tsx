import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
 
  return (
    <div className="p-10">
      {user ? (
        <LogoutLink>Logout</LogoutLink>
      ) : (
        <div className="space-x-2">
          <Button>
            {" "}
            <LoginLink>Login</LoginLink>{" "}
          </Button>
          <Button>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </div>
      )}
    </div>
  );
};
export default Home;
