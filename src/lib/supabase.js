import { createClient } from "@supabase/supabase-js";

// 在 Supabase 后台的 Project Settings -> API 里找这两个值
const supabaseUrl = "https://qthtfobuucmswpdesnml.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aHRmb2J1dWNtc3dwZGVzbm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDQ3MzIsImV4cCI6MjA5MTIyMDczMn0.hLnj3VOLm31J-pVTMC2SEY3PmtL71dr01MA-0BubGIQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
