import { notFound } from 'next/navigation';
import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';

/**
 * GET
 */

export const getCabin = async (id) => {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
        .eq('id', id)
        .single();

    // await new Promise((res) => setTimeout(res, 1000));

    if (error) {
        console.error(error);
        return notFound();
    }

    return data;
};

export const getCabinPrice = async (id) => {
    const { data, error } = await supabase
        .from('cabins')
        .select('regularPrice, discount')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
    }

    return data;
};

export const getCabins = async () => {
    // await new Promise((res) => setTimeout(res, 1000));
    const { data, error } = await supabase
        .from('cabins')
        .select('id, name, maxCapacity, regularPrice, discount, image')
        .order('name');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
};

// Guests are uniquely identified by their email address
export const getGuest = async (email) => {
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('email', email)
        .single();

    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
};

export const getBooking = async (id) => {
    const { data, error, count } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not get loaded');
    }

    return data;
};

export const getBookings = async (guestId) => {
    const fields = [
        'id',
        'created_at',
        'startDate',
        'endDate',
        'numNights',
        'numGuests',
        'totalPrice',
        'guestId',
        'cabinId',
        'cabins(name, image)',
    ];
    const { data, error, count } = await supabase
        .from('bookings')
        .select(fields.join(', '))
        .eq('guestId', guestId)
        .order('startDate');

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
};

export const getBookedDatesByCabinId = async (cabinId) => {
    // await new Promise((res) => setTimeout(res, 5000));
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    // Getting all bookings
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('cabinId', cabinId)
        .or(`startDate.gte.${today},status.eq.checked-in`);

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = data
        .map((booking) => {
            return eachDayOfInterval({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
            });
        })
        .flat();

    return bookedDates;
};

export const getSettings = async () => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }

    return data;
};

export const getCountries = async () => {
    try {
        const res = await fetch(
            'https://restcountries.com/v2/all?fields=name,flag'
        );
        const countries = await res.json();
        return countries;
    } catch {
        throw new Error('Could not fetch countries');
    }
};

/**
 * CREATE
 */

export const createGuest = async (newGuest) => {
    const { data, error } = await supabase.from('guests').insert([newGuest]);

    if (error) {
        console.error(error);
        throw new Error('Guest could not be created');
    }

    return data;
};

export const createBooking = async (newBooking) => {
    const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        // So that the newly created object gets returned!
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be created');
    }

    return data;
};

/**
 * UPDATE
 */

// The updatedFields is an object which should ONLY contain the updated data
export const updateGuest = async (id, updatedFields) => {
    const { data, error } = await supabase
        .from('guests')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }
    return data;
};

export const updateBooking = async (id, updatedFields) => {
    const { data, error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }
    return data;
};

/**
 * DELETE
 */

export const deleteBooking = async (id) => {
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    return data;
};
