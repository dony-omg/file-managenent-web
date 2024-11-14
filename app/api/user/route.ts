import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient()
        const body = await req.json()

        const { data, error } = await supabase
            .from('users')
            .insert([body])
            .select()

        if (error) {
            return NextResponse.json(
                { error: error.message }, 
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'User created successfully', data }, 
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' }, 
            { status: 400 }
        );
    }
}
