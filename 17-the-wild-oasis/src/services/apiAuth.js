import supabase from './supabase';

export const login = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getCurrentUser = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
};

export const signup = async ({ fullName, email, password }) => {
    const optionsData = {
        fullName,
        avatar: '',
    };
    const options = {
        data: optionsData,
    };
    const credentials = {
        email,
        password,
        options,
    };
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) throw new Error(error.message);

    return data;
};
