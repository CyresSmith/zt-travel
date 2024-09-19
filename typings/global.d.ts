import type uk from '../locales/uk.json';

type Messages = typeof uk;

declare global {
    interface IntlMessages extends Messages {}
}
