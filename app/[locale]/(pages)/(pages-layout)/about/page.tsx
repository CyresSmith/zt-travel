import { getTranslations } from 'next-intl/server';

import clsx from 'clsx';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';

import Container from '@components/container';
import Icon from '@components/icon';

import { namu } from '@fonts';

import { THEME_TRANSITION } from '@constants';

export async function generateMetadata() {
    const t = await getTranslations('pages.about.metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const AboutPageAccordionKeys = ['knowing', 'history', 'born', 'transport', 'embassies'] as const;
const AboutPageNames = [
    'Conrad',
    'Korolenko',
    'Korolev',
    'Ukrainka',
    'Lyatoshynsky',
    'Nestayko',
    'Perelman',
    'Richter',
    'Ohienko',
] as const;
const AboutPageEmbassies = ['georgia', 'lithuania', 'poland'] as const;
const AboutPageTransport = ['auto', 'railway'] as const;
const AboutPageHighways = ['m06', 'm07', 'm21'] as const;

const AboutPage = async () => {
    const t = await getTranslations('pages.about');

    return (
        <>
            <Container className="py-5">
                <h1 className={clsx(namu.className, 'text-5xl text-themeYellow')}>{t('title')}</h1>
            </Container>

            <section
                className={clsx(
                    'relative flex max-h-full flex-1 flex-col bg-gradient-to-b from-transparent via-themePrimary to-transparent pb-10 pt-5'
                )}
            >
                <Container className="flex flex-col">
                    <Accordion type="single" collapsible className="w-full font-light">
                        {AboutPageAccordionKeys.map((key, i) => (
                            <AccordionItem key={key} value={`item-${i + 1}`}>
                                <AccordionTrigger>
                                    <h2 className="text-2xl">{t(`${key}.title`)}</h2>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div className="flex flex-col gap-5">
                                        {key === 'born' ? (
                                            <ul className="flex flex-col gap-3">
                                                {AboutPageNames.map(name => (
                                                    <li key={name}>
                                                        <p className="text-l font-semibold">
                                                            {t(`${key}.${name}.name`)}
                                                        </p>
                                                        <p>{t(`${key}.${name}.text`)}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : key === 'transport' ? (
                                            <ul className="flex flex-col gap-3">
                                                {AboutPageTransport.map(name => (
                                                    <li key={name}>
                                                        <p className="text-l font-semibold">
                                                            {t(`${key}.${name}.title`)}
                                                        </p>
                                                        <p>{t(`${key}.${name}.text`)}</p>

                                                        {name === 'auto' && (
                                                            <ul className="ml-5 mt-2 flex flex-col gap-2">
                                                                {AboutPageHighways.map(item => (
                                                                    <li key={item}>
                                                                        <p className="font-semibold">
                                                                            {t(
                                                                                `${key}.${name}.${item}.name`
                                                                            )}
                                                                        </p>
                                                                        <p>
                                                                            {t(
                                                                                `${key}.${name}.${item}.text`
                                                                            )}
                                                                        </p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : key === 'embassies' ? (
                                            <ul className="flex flex-col gap-5">
                                                {AboutPageEmbassies.map(name => (
                                                    <li
                                                        key={name}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="overflow-hidden rounded-sm">
                                                            <Icon
                                                                name={name}
                                                                height={64}
                                                                width={122}
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="mb-1 text-l font-semibold">
                                                                {t(`${key}.text.${name}.name`)}
                                                            </p>
                                                            <ul>
                                                                <li>
                                                                    <a
                                                                        className={clsx(
                                                                            'hover:text-themeYellow',
                                                                            THEME_TRANSITION
                                                                        )}
                                                                        rel="nofollow noopener noreferrer"
                                                                        target="_blank"
                                                                        href={t(
                                                                            `${key}.text.${name}.href`
                                                                        )}
                                                                    >
                                                                        <b>
                                                                            {t(`${key}.address`)}:
                                                                        </b>{' '}
                                                                        {t(
                                                                            `${key}.text.${name}.address`
                                                                        )}
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href={`tel:${t(`${key}.text.${name}.phone`)}`}
                                                                        className={clsx(
                                                                            'hover:text-themeYellow',
                                                                            THEME_TRANSITION
                                                                        )}
                                                                    >
                                                                        <b>{t(`${key}.phone`)}:</b>{' '}
                                                                        {t(
                                                                            `${key}.text.${name}.phone`
                                                                        )}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            t(`${key}.text`)
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </section>
        </>
    );
};

export default AboutPage;
