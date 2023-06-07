import { createClient } from '@supabase/supabase-js'

import { config } from 'dotenv'

config()

const supabaseUrl = 'https://dhawnsqqbistrngrbhyz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const client = createClient(supabaseUrl, supabaseKey)
