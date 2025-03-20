import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const supabase = await createClient()
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const buffer = await file.arrayBuffer()

        const { data, error } = await supabase
            .storage
            .from('vehicle-photos')
            .upload(`${Date.now()}-${file.name}`, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('vehicle-photos')
            .getPublicUrl(data.path)

        return NextResponse.json(
            { url: publicUrl },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process upload' },
            { status: 500 }
        )
    }
}