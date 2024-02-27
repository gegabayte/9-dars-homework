function createRow(phone, index) {
    return `
    <tr>
        <td>${index}</td>
        <td>${phone.name}</td>
        <td>${phone.price}$</td>
        <td>${phone.status}</td>
        <td>${phone.description}</td>
        <td>${phone.createdAt}</td>
        <td>${phone.updatedAt}</td>
        <td data-id = ${phone.id}>
            <i  class="fa-regular fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
        </td>
    </tr>
    `
};
function validate (name, status, description, price) {
    if (!name.value) {
        alert('Telefoningizni nomini kiriting');
        name.focus();
        return false;
    }

    if (name.value.trim().length < 3 || name.value.length > 26) {
        alert('Telefoningizi nomini  togri kiriting');
        name.focus();
        return false;
    }
   

    if (!description.value) {
        alert('Izoh kiriting!');
        description.focus();
        return false;
    }

    if (description.value < 200) {
        alert('Izoh kopayb ketdi');
        description.focus();
        return false;   
    }

    if (!price.value) {
        alert('  Narxini kiriting!');
        price.focus();
        return false
    }

    if (price.value < 20) {
        alert('Telefoningizni Asl Narxini kiriting!');
        price.focus();
        return false
    }

    return true;
}

export {
    createRow,
    validate,
}