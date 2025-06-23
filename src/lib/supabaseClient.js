import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rilqlkblckmrhsatrfsj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbHFsa2JsY2ttcmhzYXRyZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NTE1ODQsImV4cCI6MjA2NTQyNzU4NH0.v2gGdW9jNN4YJkyAE8GbfWCQ2sv5KrfqJAzE988yu8s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);