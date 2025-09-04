import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lesson_id, watch_time, last_position, completed } = body;
    const user_id = (session.user as any)?.id;

    // Update or create lesson progress
    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .upsert([
        {
          user_id,
          lesson_id,
          watch_time,
          last_position,
          completed,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}