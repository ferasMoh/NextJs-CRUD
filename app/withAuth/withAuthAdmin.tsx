import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuthAdmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const withAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const admin = localStorage.getItem("role") === "admin";

    useEffect(() => {
      !admin && router.push("/pages/tasks-user");
    }, [router]);

    return <>{admin ? <WrappedComponent {...props} /> : null}</>;
  };
  return withAuth;
};

export default withAuthAdmin;
