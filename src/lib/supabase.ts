import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
    String(import.meta.env.VITE_SUPABASE_URL),
    String(import.meta.env.VITE_SUPABASE_SERVICE_KEY)
)

export const auth = supabaseClient.auth