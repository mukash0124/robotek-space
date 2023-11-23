import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
      
    },
  }

export const load = (async (event) => {
    const session = await event.locals.getSession();

  if (session) {
    throw redirect(301, '/dashboard');
  }
  return {};
})

