import { createClient } from '@supabase/supabase-js';
import { apiKey } from './apiKey';

export const supabaseUrl = 'https://twuwxetsxywtftoegsuj.supabase.co';
const supabaseKey = apiKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
