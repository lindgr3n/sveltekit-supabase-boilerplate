import { supabaseClient } from "$lib/supabase";
import type { ServerRequest, ServerResponse } from "@sveltejs/kit/types/hooks";
import cookie from 'cookie'

export async function post(request: ServerRequest) {
    const email = request.body.get('email');
    const password = request.body.get('password')

    const { data: session } = await supabaseClient.auth.api.signInWithEmail(email, password)

    // TODO: Handle invalid session

    return {
        status: 302,
        headers: {
            'Set-Cookie': cookie.serialize('session_id', session.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            }),
            location: '/'
        },
        // event is needed for supabase in hooks
        body: { session }
    }
}