function PaymentPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          background: "#f3f3f3",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#1E3A5F",
            marginBottom: "10px",
          }}
        >
          Payment
        </h1>

        <p
          style={{
            color: "#777777",
            marginBottom: "25px",
          }}
        >
          Payment page placeholder
        </p>

        <button
          type="button"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "20px",
            background: "#16B3A5",
            color: "#ffffff",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Continue Payment
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;