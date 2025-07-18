import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import Modal from '@ui/Modal';
import ConfirmDelete from '@ui/ConfirmDelete';

import { formatCurrency } from '@utils/helpers';

import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import Table from '@ui/Table';
import Menus from '@ui/Menus';

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

const DiscountFormatted = ({ discount }) => {
    if (!discount) {
        return <span>&mdash;</span>;
    }
    return <Discount>{formatCurrency(discount)}</Discount>;
};

const CabinRow = ({ cabin }) => {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();

    const handleDuplicate = () => {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    };

    return (
        <Table.Row>
            {/* Image */}
            <Img src={image} />

            {/* Cabin Name */}
            <Cabin>{name}</Cabin>

            {/* Max Capacity */}
            <div>Fits up to {maxCapacity} guests</div>

            {/* Price */}
            <Price>{formatCurrency(regularPrice)}</Price>

            {/* Discount */}
            <DiscountFormatted discount={discount} />

            {/* Action Menu */}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            {/* Duplicate */}
                            <Menus.Button
                                icon={<HiSquare2Stack />}
                                onClick={handleDuplicate}
                            >
                                Duplicate
                            </Menus.Button>

                            {/* Edit */}
                            <Modal.Open opens='edit'>
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            {/* Delete */}
                            <Modal.Open opens='delete'>
                                <Menus.Button
                                    icon={<HiTrash />}
                                    onClick={() => deleteCabin(cabinId)}
                                >
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name='edit'>
                            <CreateCabinForm cabin={cabin} />
                        </Modal.Window>

                        <Modal.Window name='delete'>
                            <ConfirmDelete
                                resourceName='cabins'
                                disabled={isDeleting}
                                onConfirm={() => deleteCabin(cabinId)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
};

export default CabinRow;
