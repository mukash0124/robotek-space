import env from 'dotenv'
import { createClient } from '@supabase/supabase-js'

env.config()

export const supabase = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.PUBLIC_SUPABASE_KEY!)