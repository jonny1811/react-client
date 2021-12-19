export const getNameType = (value) => {
    var arr = ['Administrador', 'Gerente', 'Funcionario'];
    return arr[value - 1];
};

export const getNameTypeLabel = (value) => {
    var arr = ['primary', 'secondary', 'default'];
    return arr[value - 1];
};