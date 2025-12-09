import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function AllAppointments() {
  const { appointments, getAllAppointment, atoken, appointmentCancel } =
    useContext(AdminContext);

  useEffect(() => {
    getAllAppointment();
  }, [atoken]);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
        All Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Speciality</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{appt.userData?.name}</td>
                    <td className="py-3 px-4">{appt.docData?.name}</td>
                    <td className="py-3 px-4">{appt.docData?.speciality}</td>
                    <td className="py-3 px-4">
                      {appt.slotDate.replace(/_/g, "-")}
                    </td>
                    <td className="py-3 px-4">{appt.slotTime}</td>
                    <td className="py-3 px-4 font-semibold">
                      ₹{appt.amount}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          appt.payment
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {appt.payment ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {appt.cancelled ? (
                        <span className="px-2 py-1 bg-red-200 text-red-700 rounded text-xs">
                          Cancelled
                        </span>
                      ) : (
                        <button
                          className="bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-800"
                          onClick={() => appointmentCancel(appt._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <p className="text-sm">
                  <span className="font-semibold">Patient: </span>
                  {appt.userData?.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Doctor: </span>
                  {appt.docData?.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Speciality: </span>
                  {appt.docData?.speciality}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Date: </span>
                  {appt.slotDate.replace(/_/g, "-")}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Time: </span>
                  {appt.slotTime}
                </p>

                <p className="text-sm font-semibold mt-1">
                  Amount: ₹{appt.amount}
                </p>

                <p className="text-sm mt-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      appt.payment
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {appt.payment ? "Paid" : "Unpaid"}
                  </span>
                </p>

                <div className="mt-3">
                  {appt.cancelled ? (
                    <span className="px-2 py-1 bg-red-200 text-red-700 rounded text-xs">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      className="bg-black text-white px-3 py-1 rounded text-xs w-full"
                      onClick={() => appointmentCancel(appt._id)}
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AllAppointments;