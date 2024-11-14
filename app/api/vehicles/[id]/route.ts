import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const vehicleId = parseInt(params.id);
    const vehicleData = await req.json();

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('vehicles')
        .update(vehicleData)
        .eq('id', vehicleId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Vehicle updated successfully', data }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const vehicleId = parseInt(params.id);

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Vehicle deleted successfully' }, { status: 200 });
} 