import { createClient } from '@/utils/supabase/server'
import { Vehicle } from '@/type/types'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const filter = searchParams.get('filter')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const supabase = await createClient()
    let query = supabase.from('vehicles').select('*', { count: 'exact' })

    // Apply search if provided
    if (search) {
        query = query.or(`licenseplate.ilike.%${search}%`)
    }

    // Apply filter if provided
    if (filter) {
        query = query.eq('type', filter)
    }

    // Apply pagination
    const { data, error, count } = await query
        .range(offset, offset + limit - 1)
        .order('createdat', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
        data,
        metadata: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit)
        }
    }, { status: 200 })
}