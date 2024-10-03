import type uk from '../locales/uk.json';

export type Messages = typeof uk;

declare global {
    interface IntlMessages extends Messages {}
}
