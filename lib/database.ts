import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password: string;
          role: 'student' | 'admin';
          avatar_url?: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          thumbnail_url?: string;
          instructor_id: string;
          category: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description?: string;
          video_url: string;
          duration: number;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      quizzes: {
        Row: {
          id: string;
          lesson_id?: string;
          course_id: string;
          title: string;
          questions: any; // JSON field
          passing_score: number;
          time_limit?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quizzes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['quizzes']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          completed_at?: string;
          progress: number;
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          watch_time: number;
          completed: boolean;
          last_position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lesson_progress']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['lesson_progress']['Insert']>;
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          score: number;
          answers: any; // JSON field
          completed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quiz_results']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['quiz_results']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          certificate_url: string;
          issued_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
    };
  };
}