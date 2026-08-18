import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  return (
    <div className="resetpassword-container">
      <div className="resetpassword-card">
        <h1>Reset Password</h1>

        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder=""/>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder=""/>
          </div>

          <div className="form-group">
            <label>Retype New Password</label>
            <input type="password" placeholder="" />
          </div>

          <button type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
export default ResetPasswordPage;