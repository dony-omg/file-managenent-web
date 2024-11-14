import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';
// import { User } from "@/types/types";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const  userId = parseInt(params.id);
    const { username, email, role } = await req.json();

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('users')
        .update({ username, email, role })
        .eq('id', userId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User updated successfully', data }, { status: 200 });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const  userId = parseInt(params.id);
    const { username, email, role } = await req.json();

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('Users')
        .delete()
        .eq('user_id', userId);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });

}