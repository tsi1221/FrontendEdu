import { X } from "lucide-react";

export default function PaymentModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white w-105 max-w-[90%] rounded-xl shadow-lg p-5 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">User</span>
            <span className="font-medium">{data.user}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium">{data.plan}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">${data.amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span
              className={`font-medium ${
                data.status === "paid"
                  ? "text-green-600"
                  : data.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {data.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{data.date}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">Transaction ID</span>
            <span className="font-medium break-all">
              {data.transactionId}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}