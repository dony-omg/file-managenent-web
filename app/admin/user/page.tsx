
import UserTable from './table'
import { createClient } from '@/utils/supabase/server'


export default async function Page() {
    const supabase = await createClient()

    const { data: users, error } = await supabase.from('users').select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return <div>Error fetching users</div>;
    }

    console.log(users)


    return (
        <UserTable users={users} />
    )
}