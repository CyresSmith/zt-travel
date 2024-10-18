import { getTranslations } from 'next-intl/server';

import clsx from 'clsx';

import AboutPageSection from './about-page-section';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';

import Icon from '@components/icon';

import { THEME_TRANSITION } from '@constants';

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

const AboutPageAccordion = async () => {
    const t = await getTranslations('pages.about');

    return (
        <AboutPageSection>
            <Accordion type="single" collapsible className="w-full font-light">
                {AboutPageAccordionKeys.map((key, i) => (
                    <AccordionItem key={key} value={`item-${i + 1}`}>
                        <AccordionTrigger>
                            <h3 className="text-2xl">{t(`${key}.title`)}</h3>
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
                                            <li key={name} className="flex items-center gap-3">
                                                <div className="overflow-hidden rounded-sm">
                                                    <Icon name={name} height={82} width={156} />
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
                                                                href={t(`${key}.text.${name}.href`)}
                                                            >
                                                                <b>{t(`${key}.address`)}:</b>{' '}
                                                                {t(`${key}.text.${name}.address`)}
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
                                                                {t(`${key}.text.${name}.phone`)}
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
        </AboutPageSection>
    );
};

export default AboutPageAccordion;
