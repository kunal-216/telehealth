import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Plus, Trash2, Check, X } from 'lucide-react';

const AppointmentPage = ({ userId, userRole }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    patientId: userId,
    date: '',
    time: '',
    notes: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  // Add missing statusColors object
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  // Add missing handleUpdateStatus function
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      setAppointments(appointments.map(app =>
        app._id === appointmentId ? { ...app, status: status } : app
      ));
    } catch (error) {
      setError(error.message);
      console.error('Error updating appointment status:', error);
    }
  };

  // Add missing handleDeleteAppointment function
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete appointment');
      }

      setAppointments(appointments.filter(app => app._id !== appointmentId));
    } catch (error) {
      setError(error.message);
      console.error('Error deleting appointment:', error);
    }
  };

  // Add error handling for appointment data
  const renderAppointmentName = (appointment) => {
    try {
      return userRole === 'patient'
        ? appointment.doctor?.name || 'Unknown Doctor'
        : appointment.patient?.name || 'Unknown Patient';
    } catch (error) {
      console.log(error)
      return 'Name Unavailable';
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`/api/appointments?userId=${userId}&role=${userRole}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch appointments');
        }

        setAppointments(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && userRole) {
      fetchAppointments();
    }
  }, [userId, userRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If you don't want to use shadcn/ui Alert, you can use this alternative error display
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointment),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create appointment');
      }

      // Add the new appointment to the existing list
      setAppointments([...appointments, data]);

      // Reset the form
      setNewAppointment({
        doctorId: '',
        patientId: userId,
        date: '',
        time: '',
        notes: ''
      });

      // Close the create form
      setIsCreating(false);
    } catch (error) {
      setError(error.message);
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-3 text-blue-600" />
          Appointments
        </h1>
        {!isCreating && userRole === 'patient' && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <Plus className="mr-2" /> New Appointment
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Appointment</h2>
          <form onSubmit={handleCreateAppointment} className="space-y-4">
            {userRole !== 'doctor' && (
              <input
                type="text"
                placeholder="Doctor ID"
                value={newAppointment.doctorId}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                className="w-full border rounded-md p-2"
                required
              />
            )}
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              className="w-full border rounded-md p-2"
              required
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              className="w-full border rounded-md p-2"
              required
            />
            <textarea
              placeholder="Notes (optional)"
              value={newAppointment.notes}
              onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
              className="w-full border rounded-md p-2"
              rows="3"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Create Appointment
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold">
                  {renderAppointmentName(appointment)}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[appointment.status] || 'bg-gray-100 text-gray-800'}`}>
                  {appointment.status || 'pending'}
                </span>
              </div>
              <div className="text-gray-600">
                <p>
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
                {appointment.notes && <p className="text-sm italic mt-1">{appointment.notes}</p>}
              </div>
            </div>
            <div className="flex space-x-2">
              {userRole === 'doctor' && appointment.status !== 'completed' && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(appointment._id, 'confirmed')}
                    className="text-green-500 hover:bg-green-100 p-2 rounded-full"
                  >
                    <Check />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(appointment._id, 'cancelled')}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    <X />
                  </button>
                </>
              )}
              <button
                onClick={() => handleDeleteAppointment(appointment._id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-full"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AppointmentPage.propTypes = {
  userId: PropTypes.string.isRequired,
  userRole: PropTypes.oneOf(['patient', 'doctor']).isRequired,
};

export default AppointmentPage;