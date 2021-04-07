const processToCheckout = () => {
    return {type: 'PROCESS_TO_CHECKOUT'};
};

const processToDop = () => {
    return {type: 'PROCESS_TO_DOP'};
};

const processToMain = () => {
    return {type: 'PROCESS_TO_MAIN'};
};

const deliveryTypeWasChanged = (deliveryType) => {
    return {
        type: 'CHECKOUT_DELIVERY_TYPE_WAS_CHANGED',
        payload: deliveryType
    }
};

export {
    processToCheckout,
    processToMain,
    processToDop,
    deliveryTypeWasChanged
}