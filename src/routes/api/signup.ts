import { supabaseClient } from "$lib/supabase";
import type { EndpointOutput } from "@sveltejs/kit";
import type { ReadOnlyFormData } from "@sveltejs/kit/types/helper";
import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import cookie from 'cookie'

export async function post(request: ServerRequest) {

    const email = request.body.get('email');
    const password = request.body.get('password')

    const { data: session } = await supabaseClient.auth.api.signUpWithEmail(
        email,
        password,
    )

    // TODO: Handle invalid signup

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
        body: { session }
    }
}
