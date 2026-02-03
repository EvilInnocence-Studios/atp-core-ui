import { IProduct } from "@store-shared/product/types";

export const serializeError = (error: any): any => {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...(error as any), // Capture any other custom properties
        };
    }
    if (typeof error === 'object') {
        try {
            return JSON.parse(JSON.stringify(error));
        } catch (e) {
            return String(error);
        }
    }
    return String(error);
};

export const getSystemContext = () => {
    return {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        screen: {
            width: window.screen.width,
            height: window.screen.height,
        },
    };
};

export const getCartContext = (cart: any) => {
    return {
        items: cart.products.map((p: IProduct) => ({
            id: p.id,
            name: p.name,
            price: p.price,
        })),
        totals: cart.totals,
        couponCode: cart.couponCode,
    };
};
