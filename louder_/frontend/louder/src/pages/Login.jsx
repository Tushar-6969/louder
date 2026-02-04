const Login = () => {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "380px", width: "100%" }}>
        <h3 className="text-center mb-4">🔐 Admin Login</h3>

        <button
          className="btn btn-danger w-100"
          onClick={googleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
