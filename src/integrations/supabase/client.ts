
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qflvgmkyuyyjtvxlowyc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbHZnbWt5dXl5anR2eGxvd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDAyNTMsImV4cCI6MjA1ODgxNjI1M30.lR8uC7NOFHXq-4Pibr1EmfLGWGio8KWRrShm0gGdLDc";

// Create Supabase client with the production schema
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    db: {
      schema: 'production'
    }
  }
);
