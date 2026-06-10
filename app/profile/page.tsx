import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Image from 'next/image';

export default async function ProfilePage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Perfil
                        </h1>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 space-y-4">
                        <div className="flex items-center gap-4">
                            {session?.user?.image && (
                                <Image
                                    height={80}
                                    width={80}
                                    src={session.user.image}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full ring-4 ring-white shadow-md"
                                />
                            )}
                            <div>
                                <p className="text-gray-500 text-sm">Nombre</p>
                                <p className="text-gray-900 font-semibold">{session?.user?.name}</p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-blue-100">
                            <p className="text-gray-500 text-sm">Email</p>
                            <p className="text-gray-900 font-semibold">{session?.user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}