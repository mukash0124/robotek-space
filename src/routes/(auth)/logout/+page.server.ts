import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async (event) => {
    const session = await event.locals.getSession();

    if (!session) {
        throw redirect(301, '/');
    }
    return {};
}

export const actions: Actions = {
    async default({ locals: { supabase } }) {
        await supabase.auth.signOut();
        throw redirect(303, '/');
    }
}
