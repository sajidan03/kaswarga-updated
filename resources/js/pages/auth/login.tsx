import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, usePage } from '@inertiajs/react';
import { LoaderCircle, LogIn, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({
        username: false,
        password: false
    });

    const { profil } = usePage<{ profil: { nama: string; logo?: string } }>().props;

    const handleFocus = (field: string) => {
        setIsFocused(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: string) => {
        setIsFocused(prev => ({ ...prev, [field]: false }));
    };

    return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
                <div className="w-full max-w-md">
                    {/* Card Container */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                                {profil.logo ? (
                                    <img
                                        src={`/storage/assets/${profil.logo}`}
                                        alt={`Logo ${profil.nama}`}
                                        className="w-10 h-10 object-contain"
                                    />
                                ) : (
                                    <LogIn className="h-8 w-8 text-white" />
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Masuk ke {profil.nama}
                            </h1>
                            <p className="text-gray-600">
                                Masukkan username dan password Anda
                            </p>
                        </div>

                        <Form
                            {...AuthenticatedSessionController.store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                <p className='text-[#066855] font-bold'>Username</p>
                                    <div className="space-y-6 -mt-3">
                                        {/* Username Field */}
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <div className={`flex items-center border-b-2 transition-all duration-300 ${
                                                    isFocused.username
                                                        ? 'border-teal-500'
                                                        : errors.username
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                }`}>
                                                    <User className={`h-5 w-5 transition-colors duration-300 ${
                                                        isFocused.username
                                                            ? 'text-teal-500'
                                                            : errors.username
                                                                ? 'text-red-500'
                                                                : 'text-gray-400'
                                                    }`} />
                                                    <Input
                                                        id="username"
                                                        type="text"
                                                        name="username"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="username"
                                                        // placeholder="Username"
                                                        className="border-0 shadow-none focus-visible:ring-0 pl-3 pr-4 py-3 text-base placeholder-gray-400 bg-transparent"
                                                        onFocus={() => handleFocus('username')}
                                                        onBlur={() => handleBlur('username')}
                                                    />
                                                </div>
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>
                                        </div>
                                        <p className='text-[#066855] font-bold'>Password</p>
                                        {/* Password Field */}
                                        <div className="space-y-2 -mt-3">
                                            <div className="relative">
                                                <div className={`flex items-center border-b-2 transition-all duration-300 ${
                                                    isFocused.password
                                                        ? 'border-teal-500'
                                                        : errors.password
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                }`}>
                                                    <Lock className={`h-5 w-5 transition-colors duration-300 ${
                                                        isFocused.password
                                                            ? 'text-teal-500'
                                                            : errors.password
                                                                ? 'text-red-500'
                                                                : 'text-gray-400'
                                                    }`} />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="current-password"
                                                        // placeholder="Password"
                                                        className="border-0 shadow-none focus-visible:ring-0 pl-3 pr-12 py-3 text-base placeholder-gray-400 bg-transparent"
                                                        onFocus={() => handleFocus('password')}
                                                        onBlur={() => handleBlur('password')}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        tabIndex={3}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5" />
                                                        ) : (
                                                            <Eye className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError message={errors.password} className="mt-2" />
                                            </div>
                                        </div>
                                        <br />
                                        {/* Remember Me & Forgot Password
                                        <div className="flex items-center justify-between">
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-teal-600 hover:text-teal-700 transition-colors duration-200 font-medium"
                                                    tabIndex={5}
                                                >
                                                    Lupa kata sandi?
                                                </TextLink>
                                            )}
                                        </div> */}

                                        {/* Login Button */}
                                        <Button
                                            type="submit"
                                            className="w-full bg-[#066855] hover:bg-[#055544] text-white py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                            tabIndex={4}
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <LogIn className="h-5 w-5 mr-2" />
                                                    Masuk
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        {/* Status Message */}
                        {status && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                                <div className="text-sm font-medium text-green-700">{status}</div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
    );
}
