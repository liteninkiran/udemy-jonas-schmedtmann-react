import { createClient } from '@supabase/supabase-js';
import { apiKey } from './apiKey';

const supabaseUrl = 'https://twuwxetsxywtftoegsuj.supabase.co';
// const supabaseUrl = 'https://sdsadsadsad.supabase.co';
const supabaseKey = apiKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
