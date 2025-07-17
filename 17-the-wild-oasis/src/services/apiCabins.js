import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
};

export const deleteCabin = async (id) => {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }

    return data;
};

export const createEditCabin = async (newCabin, id) => {
    const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

    let imageName = `${Math.random()}-${newCabin.image.name}`;
    imageName.replaceAll('/', '');

    const cabinUrl = 'storage/v1/object/public/cabin-images/';
    const imagePath = hasImage
        ? newCabin.image
        : `${supabaseUrl}/${cabinUrl}/${imageName}`;

    let query = supabase.from('cabins');

    const cabin = { ...newCabin, image: imagePath };

    if (id) {
        query = query.update(cabin).eq('id', id);
    } else {
        query = query.insert([cabin]);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    // Upload image
    if (hasImage) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
        console.error(storageError);
        await supabase.from('cabins').delete().eq('id', data.id);
        throw new Error(
            'Cabin image could not be uploaded. The cabin has not been created.'
        );
    }

    return data;
};
