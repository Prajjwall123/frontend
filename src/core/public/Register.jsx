import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../utils/authHepler";
import logo from "../../assets/logo.png";
import register from "../../assets/register.png";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await registerUser({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
            });
            toast.success("Registration successful! Please verify your email.");
            navigate("/verify-otp", { state: { email: form.email } });
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl border-2 border-gray-300 overflow-hidden"
            >
                {/* Left: Image */}
                <div className="hidden md:block w-1/2 bg-gray-100">
                    <img
                        src={register}
                        alt="University"
                        className="object-cover w-full h-full rounded-l-lg"
                    />
                </div>
                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-8 flex flex-col items-center">
                        <img src={logo} alt="Logo" className="w-50 h-16 mb-2" />
                    </div>
                    <h2 className="text-2xl text-center font-bold mb-2">Register Account</h2>
                    <p className="mb-6 text-center text-gray-500">Please enter your details to create an account.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-600"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-gray-600"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm">
                        Already Have an account?{' '}
                        <Link to="/login" className="font-semibold underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
