import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'


export async function deleteUser(userId: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('users').delete().eq('user_id', userId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/user')
    return { success: true }
}