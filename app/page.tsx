import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Hero from "./components/landing-page/hero";
import Features from "./components/landing-page/features";
import Logos from "./components/landing-page/logos";
import { redirect } from "next/navigation";
const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user?.id) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Logos />
      <Features />
    </div>
  );
};
export default Home;
