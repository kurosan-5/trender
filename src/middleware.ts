import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {parse} from 'cookie';
export function middleware(request: NextRequest) {

    // クッキーからauth_tokenを取得
    const cookies = parse(request.headers.get('cookie') || '');
    const user = cookies.auth_token;

    const url = request.nextUrl;

    if (!user && url.pathname !== '/auth/signin' && url.pathname !== '/auth/signup'&& url.pathname !== '/auth') {
        // ログインしていない場合は/auth/signinにリダイレクト
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    if (user && url.pathname.startsWith('/auth')) {
        // ログイン済みの場合はホームにリダイレクト
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // そのまま進む
    return NextResponse.next();
}

// 適用対象のルート
export const config = {
    matcher: ['/','/home', '/auth/signin','/auth/signup'],
};
