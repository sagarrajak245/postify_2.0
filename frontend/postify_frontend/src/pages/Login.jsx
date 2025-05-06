import { Github } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Checkbox } from "../components/Checkbox"
import { Input } from "../components/Input"

export default function Login() {
    return (
        <div className="flex min-h-screen">
            {/* Left Column - Purple Gradient */}
            <div className="hidden w-full bg-gradient-to-b from-purple-400 to-purple-800 lg:flex lg:w-1/2 flex-col items-center justify-center p-12 text-white">
                <div className="max-w-md">
                    <h2 className="mb-6 text-2xl font-bold">Flowers&Saints</h2>
                    <h1 className="mb-6 text-4xl font-bold">Welcome Back</h1>
                    <p className="mb-12 text-xl">Log in to your account to continue your journey with us.</p>

                    <div className="space-y-6">
                        <div className="flex items-center rounded-lg bg-purple-500/30 p-4">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-800">
                                <span className="font-bold">1</span>
                            </div>
                            <span className="text-xl">Enter your credentials</span>
                        </div>

                        <div className="flex items-center rounded-lg bg-purple-500/30 p-4">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-800">
                                <span className="font-bold">2</span>
                            </div>
                            <span className="text-xl">Access your workspace</span>
                        </div>

                        <div className="flex items-center rounded-lg bg-purple-500/30 p-4">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-800">
                                <span className="font-bold">3</span>
                            </div>
                            <span className="text-xl">Continue your work</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Black Background */}
            <div className="w-full bg-black lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">Log In</h1>
                        <p className="mt-2 text-gray-400">Enter your credentials to access your account.</p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="flex gap-4">
                            <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-black">
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                    <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="w-full bg-white hover:bg-gray-100 text-black">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-black px-4 text-gray-400">Or</span>
                            </div>
                        </div>

                        <Input
                            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                            type="email"
                            placeholder="EXAMPLE@FLOWERSANDSAINTS.COM.AU"
                        />

                        <Input
                            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                            type="password"
                            placeholder="YourPassword"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox id="remember" className="border-gray-700 data-[state=checked]:bg-purple-600" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full bg-white hover:bg-gray-100 text-black">Log In</Button>

                        <p className="text-center text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}