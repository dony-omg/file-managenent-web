import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('users').select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
