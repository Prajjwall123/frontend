import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../utils/passwordResetHelper';
import logo from '../../assets/logo.png';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            navigate('/forgot-password');
        }
    }, [location, navigate]);

    const validatePassword = () => {
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setIsLoading(true);
        const { success } = await resetPassword(email, otp, newPassword);
        setIsLoading(false);

        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <img src={logo} alt="Logo" className="w-32 h-16 mb-2" />
            <h1 className="text-3xl font-bold mb-2 text-center">Reset Password</h1>
            <p className="mb-8 text-center text-gray-400 max-w-lg">
                Enter the OTP sent to your email and your new password
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="mb-6">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        OTP Code
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter 6-digit OTP"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${passwordError ? 'border-red-500' : ''}`}
                        placeholder="Confirm new password"
                    />
                    {passwordError && (
                        <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 transition mb-6"
                >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        Back to Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
