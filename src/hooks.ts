import { supabaseClient } from "$lib/supabase";
import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import cookie from 'cookie'

const publicPaths = ['/login', '/signup']
const publicAPIPaths = ['/login', '/signup'].map(path => `/api${path}`)

function protectedPath(path) {
    return !(publicAPIPaths.includes(`${path}`) || publicPaths.includes(`${path}`));
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    const session_id = cookie.parse(request.headers.cookie || '').session_id || null
    const { user } = await supabaseClient.auth.api.getUser(session_id)

    const { path, method } = request;

    // Add user to locals so we can expose it to client in getSession
    request.locals = {
        user
    }

    // Check if we are about access a protected path
    if (protectedPath(path)) {
        // Need to check so the user have a session (have a cookie with session_id)
        if (!session_id) {
            return {
                status: 302,
                headers: {
                    location: '/login'
                }
            }
        }
    }

    const response = await resolve(request);

    return {
        ...response,
        headers: {
            ...response.headers,
        }
    };
}

export function getSession(request: ServerRequest) {
    const { user } = request.locals;

    return {
        user
    }
}