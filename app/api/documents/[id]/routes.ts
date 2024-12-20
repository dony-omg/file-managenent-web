import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const documentId = parseInt(params.id);
    const { file_path } = await req.json(); // Assuming these are the fields you want to update

    console.log('file_path', file_path);
    
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('documents')
        .update({file_path})
        .eq('id', documentId)
        .single();

    if (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Document updated successfully', data }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const documentId = parseInt(params.id);

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Document deleted successfully' }, { status: 200 });
}
