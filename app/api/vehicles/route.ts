import { createClient } from '@/utils/supabase/server'
import {Vehicle} from '@/type/types'
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const { registration_number, vehicle_type, brand, color, year_of_manufacture, owner_id }: Vehicle = await req.json();

    const supabase = await createClient()

    const {data, error} = await supabase.from('vehicles').insert({
        registration_number,
        vehicle_type,
        brand,
        color,
        year_of_manufacture,
        owner_id
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Vehicle created successfully' }, { status: 201 });

}