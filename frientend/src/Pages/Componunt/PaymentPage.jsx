import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔹 Load payment input JSON (offline simulation)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("paymentInput"));
    setPaymentData(storedData);
  }, []);

  const handlePayment = async () => {
    if (!paymentData) return;

    setProcessing(true);

    // 🔹 API JSON (as required)
    const purchasePayload = {
      userEmail: paymentData.user.email,
      courseId: paymentData.course.id,
      courseName: paymentData.course.name,
      amount: paymentData.course.price,
      purchaseDate: new Date().toISOString()
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(purchasePayload)
        }
      );

      if (!response.ok) {
        throw new Error("Payment save failed");
      }

      // 🔹 Offline success simulation
      setTimeout(() => {
        setProcessing(false);
        setSuccess(true);

        const paymentOutput = {
          status: "SUCCESS",
          transactionId: "TXN" + Date.now(),
          courseId: paymentData.course.id,
          amountPaid: paymentData.course.price,
          user: paymentData.user.email
        };

        localStorage.setItem(
          "paymentOutput",
          JSON.stringify(paymentOutput)
        );
      }, 1500);

    } catch (error) {
      console.error(error);
      setProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-4 md:px-10 pt-28 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">

            {!success ? (
              <>
                <h1 className="text-2xl font-bold mb-2">
                  Complete Your Payment
                </h1>

                <p className="text-gray-400 text-sm mb-8">
                  Offline QR payment demo (No real transaction).
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                  {/* LEFT → QR */}
                  <div className="rounded-2xl bg-black/40 border border-white/10 p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Scan QR to Pay
                    </h3>

                    <p className="text-sm text-gray-400 mb-4">
                      Google Pay / PhonePe / Paytm
                    </p>

                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-xl">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=Offline-Payment-Demo"
                          alt="QR Code"
                          className="w-52 h-52"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      ⚠️ Demo QR Code only
                    </p>
                  </div>

                  {/* RIGHT → INFO */}
                  {paymentData && (
                    <div className="space-y-4">
                      <InfoBox label="Course ID" value={paymentData.course.id} />
                      <InfoBox label="Course Name" value={paymentData.course.name} />
                      <InfoBox label="Price" value={`₹${paymentData.course.price}`} />
                      <InfoBox label="User Email" value={paymentData.user.email} />

                      <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`w-full mt-4 py-3 rounded-xl font-semibold transition
                          ${
                            processing
                              ? "bg-indigo-600/40 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                      >
                        {processing
                          ? "Verifying Payment..."
                          : "I Have Paid (Confirm)"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* ✅ SUCCESS */
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>

                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  Payment Successful
                </h2>

                <p className="text-gray-400 mb-6">
                  Course unlocked successfully.
                </p>

                <button
                  onClick={() => (window.location.href = "/dashboard/mycourses")}
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
                >
                  Go to My Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// 🔹 Reusable Info Component
const InfoBox = ({ label, value }) => (
  <div className="rounded-xl bg-black/40 border border-white/10 p-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-indigo-400">{value}</p>
  </div>
);

export default PaymentPage;
