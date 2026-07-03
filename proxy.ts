import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {  NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/auth';
const handleI18nRouting = createMiddleware(routing);
const authPages= ['/login','/signup']
const protectedPages = ['/dashboard','/profile']

type NextProxy = (request : NextRequest) => NextResponse | Promise <NextResponse>
type ProxyFactory =(next:NextProxy)=>NextProxy

function chain(functions: ProxyFactory[], index = 0): NextProxy {
    const current = functions[index];
    if (current) {
      const next = chain(functions, index + 1);
      return current(next);
    }
    return () => NextResponse.next();
  }
const withAuth : ProxyFactory = (next)=>async (request: NextRequest)=> {
    const {pathname} = request.nextUrl
    const session= await verifySession()

    const isAuthPage=authPages.some((page)=>pathname.includes(page))
    const isProtectedPage = protectedPages.some((page) => pathname.includes(page));

    if (isProtectedPage && !session) {
        const loginUrl= new URL('/login',request.url)
        return  NextResponse.redirect(loginUrl)
    }
    if (isAuthPage && session) {
        const homeURL= new URL('/',request.url)
        return  NextResponse.redirect(homeURL)
    }
    return next(request)
}
const withI18n: ProxyFactory = (next) => (request) => {
    return handleI18nRouting(request);
};
export const proxy = chain([withAuth, withI18n]);

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
