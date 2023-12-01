import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuthUser = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const withAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const admin = localStorage.getItem("role") === "user";

    useEffect(() => {
      !admin && router.push("/pages/tasks");
    }, [router]);

    return <>{admin ? <WrappedComponent {...props} /> : null}</>;
  };
  return withAuth;
};

export default withAuthUser;
