import { Button } from "@/components/ui/button";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Button>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button>
          <a href="/sign-up">Sign Up</a>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
