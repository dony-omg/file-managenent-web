
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const fileName = formData.get('fileName') as string || file?.name


        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        const supabase = await createClient()
        const { data, error } = await supabase.storage
            .from('documents')
            .upload(`uploads/${fileName}`, file)


        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({
            message: 'File uploaded successfully',
            data: data
        }, { status: 200 })

    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        )
    }
}

export async function OPTIONS(req: Request) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    })
}
