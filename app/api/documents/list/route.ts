
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/documents/list:
 *   get:
 *     summary: Get documents list with filters and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: document_type
 *         schema:
 *           type: string
 *       - in: query
 *         name: vehicle_id
 *         schema:
 *           type: integer
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const search = searchParams.get('search')
    const documentType = searchParams.get('document_type')
    const vehicleId = searchParams.get('vehicle_id')

    const supabase = await createClient()
    
    let query = supabase
        .from('documents')
        .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
        query = query.ilike('document_type', `%${search}%`)
    }

    if (documentType) {
        query = query.eq('document_type', documentType)
    }

    if (vehicleId) {
        query = query.eq('vehicle_id', vehicleId)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    query = query.range(startIndex, startIndex + limit - 1)

    const { data, error, count } = await query

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

    return NextResponse.json({
        data,
        metadata: {
            total: count ?? 0,
            page,
            limit,
            totalPages: count ? Math.ceil(count / limit) : 0
        }
    })
}
