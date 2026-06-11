import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';
 
export function proxy(request: NextRequest) {
    return createMiddleware(routing)(request);
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};