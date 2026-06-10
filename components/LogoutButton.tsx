'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/signIn' })}
            className="bg-white/20 text-white py-2 px-4 rounded-lg hover:bg-red-500 hover:shadow-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
        >
            Cerrar Sesión
        </button>
    );
}