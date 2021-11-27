import { session } from "$app/stores";
import { supabaseClient } from "$lib/supabase";
import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import cookie from 'cookie'

export async function post(request: ServerRequest) {
    // TODO: Do we need to signout supabase here
    const session_id = cookie.parse(request.headers.cookie || '').session_id || null
    const { error } = await supabaseClient.auth.api.signOut(session_id)
    return {
        status: 302,
        headers: {
            'location': '/login',
            'set-cookie': `session_id=; path=/; expires=0;`
        }
    }
}