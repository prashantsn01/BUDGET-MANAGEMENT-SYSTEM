import { useAuthStore } from "../../../store/authStore";
import { useBudgetStore } from "../../../store/budgetStore";
import { toast } from "react-hot-toast";

const DeleteBudgetModal = ({ isOpen, onClose, budgetId }) => {
    const { user } = useAuthStore();
    const { deleteBudget } = useBudgetStore();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteBudget(user.user_id, budgetId);
            toast.success("Budget deleted successfully.");
            onClose();
        } catch (error) {
            console.error("Failed to delete budget:", error);
            toast.error("Failed to delete budget. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-auto">
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                        Confirm Delete
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete this budget? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteBudgetModal;
