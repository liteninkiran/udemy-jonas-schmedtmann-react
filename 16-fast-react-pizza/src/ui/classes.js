const baseClasses = [
    'inline-block',
    'text-sm',
    'rounded-full',
    'bg-yellow-400',
    'font-semibold',
    'uppercase',
    'tracking-wide',
    'text-stone-800',
    'transition-colors',
    'duration-300',
    'hover:bg-yellow-300',
    'focus:bg-yellow-300',
    'focus:outline-none',
    'focus:ring',
    'focus:ring-yellow-300',
    'focus:ring-offset-2',
    'disabled:cursor-not-allowed',
];

const secondaryClasses = [
    'inline-block',
    'text-sm',
    'rounded-full',
    'border-2',
    'border-stone-300',
    'font-semibold',
    'uppercase',
    'tracking-wide',
    'text-stone-400',
    'transition-colors',
    'duration-300',
    'hover:bg-stone-300',
    'hover:text-stone-800',
    'focus:bg-stone-300',
    'focus:text-stone-800',
    'focus:outline-none',
    'focus:ring',
    'focus:ring-stone-200',
    'focus:ring-offset-2',
    'disabled:cursor-not-allowed',
    'px-4',
    'py-2.5',
    'md:px-6',
    'md:py-3.5',
];

const searchOrderClasses = [
    'w-28',
    'rounded-full',
    'bg-yellow-100',
    'px-4',
    'py-2',
    'text-sm',
    'transition-all',
    'duration-300',
    'placeholder:text-stone-400',
    'focus:outline-none',
    'focus:ring',
    'focus:ring-yellow-500',
    'focus:ring-opacity-50',
    'sm:w-64 sm:focus:w-72',
];

const cartContainerClasses = [
    'flex',
    'items-center',
    'justify-between',
    'bg-stone-800',
    'px-4',
    'py-4',
    'text-sm',
    'uppercase',
    'text-stone-200',
    'sm:px-6',
    'md:text-base',
];

const cartParaClasses = [
    'space-x-4',
    'font-semibold',
    'text-stone-300',
    'sm:space-x-6',
];

const orderContainerClasses = [
    'mb-5',
    'flex',
    'flex-col',
    'gap-2',
    'sm:flex-row',
    'sm:items-center',
];

const joinChar = ' ';
const joinArray = (arr) => arr.join(joinChar);

export const baseClass = joinArray(baseClasses);
export const secondaryClass = joinArray(secondaryClasses);
export const searchOrderClass = joinArray(searchOrderClasses);
export const cartContainerClass = joinArray(cartContainerClasses);
export const cartParaClass = joinArray(cartParaClasses);
export const orderContainerClass = joinArray(orderContainerClasses);
