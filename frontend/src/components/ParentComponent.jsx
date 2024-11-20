import { useAuthContext } from "../context/AuthContext";
import AppointmentPage from "./AppointmentPage";

const ParentComponent = () => {
    const { user, loading, error } = useAuthContext();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center p-4">
                Please log in to view appointments
            </div>
        );
    }

    return <AppointmentPage userId={user._id} userRole={user.role} />;
};

export default ParentComponent