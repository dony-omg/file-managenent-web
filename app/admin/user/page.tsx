
import UserTable from './table'
import { createClient } from '@/utils/supabase/server'


export default async function Page() {

    // const { data: users, error } = await supabase.auth.admin.listUsers()

    // if (error) {
    //     console.error('Error fetching users:', error);
    //     return <div>Error fetching users</div>;
    // }


    return (
        <UserTable />
    )
}