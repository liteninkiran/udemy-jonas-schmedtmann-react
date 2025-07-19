import supabase from './supabase';

export const login = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
        throw new Error(error.message);
    }
    console.log(data);
    return data;
};
