import type { InjectionKey } from "vue";

export type CartType = Record<string, number>;
export type CartFunctionType = (num: number) => void;

export const CART_KEY = Symbol() as InjectionKey<CartType>;
export const ADD_TO_CART_KEY = Symbol() as InjectionKey<CartFunctionType>;
export const REMOVE_FROM_CART_KEY = Symbol() as InjectionKey<CartFunctionType>;
export const REMOVE_COMPLETELY_FROM_CART_KEY = Symbol() as InjectionKey<CartFunctionType>;
