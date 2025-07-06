export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token → redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Token found → allowing access");
  return children;
}
