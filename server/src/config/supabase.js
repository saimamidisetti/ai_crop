const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials are not fully set in the environment.");
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder');

module.exports = supabase;
