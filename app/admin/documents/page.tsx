import VehicleList from "./table"
import { createClient } from '@/utils/supabase/server'


export default async function Page() {
    const supabase = await createClient()
    const { data: vehicles, error } = await supabase.from('documents').select('*')

    console.log(vehicles)

    return <VehicleList />
}