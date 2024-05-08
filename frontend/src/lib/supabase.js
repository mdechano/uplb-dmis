import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://ittcyulckzijoptobzab.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0dGN5dWxja3ppam9wdG9iemFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNTI0ODksImV4cCI6MjAzMDcyODQ4OX0.5gl-cFMP6Kg9kuxqElKrnymiINmYIo1QyjYNQ_XKg0g"
  );