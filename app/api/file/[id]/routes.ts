import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const fileId = parseInt(params.id);
    const fileData = await req.json();

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('files')
        .update(fileData)
        .eq('id', fileId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'File updated successfully', data }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const fileId = parseInt(params.id);

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const fileId = parseInt(params.id);
    
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', fileId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
