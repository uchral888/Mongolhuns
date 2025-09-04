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
    const { quiz_id, answers, score } = body;
    const user_id = (session.user as any)?.id;

    // Save quiz result
    const { data: result, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id,
          quiz_id,
          score,
          answers,
          completed_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Check if this completes a course for certificate generation
    // This would involve checking if all lessons and final exam are completed

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}