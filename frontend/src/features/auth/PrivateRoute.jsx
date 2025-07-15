import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const location = useLocation();

  // ✅ Still fetching user — show nothing (or loader)
  if (status === "loading") {
    return null; // or return <Loader />
  }

  // ❌ No user — redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ User has no access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
