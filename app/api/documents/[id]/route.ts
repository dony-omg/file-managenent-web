import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = (await params).id
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('documents') // Replace with your actual table name
        .select('*') // Select all fields or specify the fields you need
        .eq('document_id', id) // Filter by document_id
        .single(); // Use .single() to get a single record


    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
}
