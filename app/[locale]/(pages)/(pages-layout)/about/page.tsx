import clsx from 'clsx';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';

import Container from '@components/container';
import Icon from '@components/icon';

import { namu } from '@fonts';

type Props = {};

const AboutPage = (props: Props) => {
    return (
        <>
            <Container className="py-5">
                <h1 className={clsx(namu.className, 'text-5xl text-themeYellow')}>
                    Житомирщіна туристична
                </h1>
            </Container>

            <section
                className={clsx(
                    'relative flex max-h-full flex-1 flex-col bg-gradient-to-b from-transparent via-themePrimary to-transparent pb-10 pt-5'
                )}
            >
                <Container className="flex flex-col">
                    <Accordion type="single" collapsible className="w-full font-light">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <h2 className="text-2xl">Варто знати</h2>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col gap-5">
                                    <p>
                                        Житомирщина – область на півночі України, в межах Поліської
                                        низовини, на півдні в межах Придніпровської височини. На
                                        півночі межує з Гомельською областю Білорусі, на сході з
                                        Київською, на півдні з Вінницькою, на заході з Хмельницькою
                                        та Рівненською областями України. Адміністративним центром є
                                        м. Житомир.
                                        <br />
                                        <br />
                                        Житомирщина входить у п'ятірку найбільших за площею областей
                                        України. Площа області становить 29,9 тис. км2, що складає
                                        4,9% території України. За своїми розмірами поступається
                                        лише Одеській, Дніпровській, Чернігівській та Харківській
                                        областям. В той же час, Житомирщина більша ніж такі країни
                                        як Вірменія, Албанія, Ізраїль, Кіпр або Ліван.
                                        <br />
                                        <br />
                                        Протяжність області із заходу на схід сягає 170 кілометрів,
                                        а відстань з півночі на південь складає 230 кілометрів.
                                        Складається з 23 районів. Має 5 міст обласного значення
                                        (Бердичів, Житомир, Коростень, Малин, Новоград-Волинський),
                                        7 міст районного значення (Андрушівка, Баранівка,
                                        Коростишів, Овруч, Олевськ, Радомишль, Чуднів), 43 селища
                                        міського типу; 1619 сільських населених пунктів.
                                        <br />
                                        <br />
                                        Завдяки вигідному географічному положенню і розгалуженій
                                        мережі автомобільних шляхів та залізниць область має зручне
                                        транспортне сполучення з Києвом, Львовом, Ужгородом,
                                        Харковом, Одесою, Мінськом, Москвою, Санкт-Петербургом, а
                                        також країнами Східної і Центральної Європи.
                                        <br />
                                        <br />
                                        Житомирщина має потужний ресурсний потенціал для розвитку
                                        туризму, починаючи від природних об’єктів, аналогів яким
                                        немає в Україні та світі (Геологічний заказник «Камінне
                                        село», більш як 500-літні дуби «Урочища «Тригір’я»,
                                        унікальні сосни «Урочища «Модрина», реліктова Азалія
                                        Понтійська «Поліського природного заповідника»), закінчуючи
                                        сучасними промисловими підприємствами, які радо приймають
                                        відвідувачів та демонструють свої виробництва (ПАТ
                                        Житомирський маслозавод - компанія «Рудь», ТОВ «Органік
                                        Мілк», ПрАТ «Мар’янівський склозавод»).
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <h2 className="text-2xl">Історія</h2>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col gap-5">
                                    <p>
                                        У V-VII ст. нової ери територія Житомирської області була
                                        заселена східнослов'янськими племенами: північ – древлянами,
                                        центральна частина і південь – полянами, які займались
                                        землеробством і скотарством. Древляни займались також
                                        мисливством, бджільництвом, виробництвом ювелірних прикрас,
                                        торгівлею. У ІХ ст. з'являються міста, що стають центрами
                                        ремесел і торгівлі: Вручий (Овруч), Іскорость (Коростень).
                                        <br />
                                        <br />
                                        У XI – на поч. ХІІ ст. сучасна територія Житомирської
                                        області входила до складу Київської Русі. Волинь і Полісся,
                                        за відомим істориком І. Крип'якевичем, належали до
                                        слов'янської прабатьківщини, були колискою українського
                                        народу.
                                        <br />
                                        <br />
                                        Житомирщина входить у п'ятірку найбільших за площею областей
                                        України. Площа області становить 29,9 тис. км2, що складає
                                        4,9% території України. За своїми розмірами поступається
                                        лише Одеській, Дніпровській, Чернігівській та Харківській
                                        областям. В той же час, Житомирщина більша ніж такі країни
                                        як Вірменія, Албанія, Ізраїль, Кіпр або Ліван.
                                        <br />
                                        <br />
                                        За результатом трьох поділів Польщі (1772, 1793, 1795)
                                        Волинь разом з Київщиною і Поділлям увійшли до складу
                                        Російської імперії. Територія краю увійшла до складу
                                        Волинської і частково до Київської губерній, утворених
                                        царським указом 1797 р. Центром Волинської губернії від 1804
                                        р. став Житомир.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <h2 className="text-2xl">На Житомирщині народилися</h2>
                            </AccordionTrigger>

                            <AccordionContent>
                                <ul className="flex flex-col gap-5">
                                    <li>
                                        <p>
                                            Джозеф Конрад (Юзеф Теодор Конрад Коженьовський)
                                            (Бердичів, 1857-1924) – англійський письменник
                                            польського походження, класик англійської літератури.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Володимир Короленко (Житомир, 1853-1921) – видатний
                                            російський письменник українського походження.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Сергій Корольов (Житомир, 1906-1966) – радянський вчений
                                            українського походження, конструктор. Під його
                                            керівництвом запущено першу міжконтинентальну балістичну
                                            ракету, перший штучний супутник Землі, перший політ
                                            людини в космос та вихід людини в космос.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Леся Українка (Лариса Косач-Квітка)
                                            (Новоград-Волинський, 1871-1913) – видатна українська
                                            поетеса.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Борис Лятошинський (Житомир, 1895-1968) – український
                                            композитор, вважається одним з основоположників
                                            модерного напрямку в українській музиці.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Всеволод Нестайко (Бердичів, 1930-2014) – український
                                            письменник, класик дитячої літератури, автор улюбленої
                                            дитячої книжки «Тореадори з Васюківки» та багатьох
                                            інших.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Натан Перельман (Житомир, 1906-2002) – видатний
                                            радянський піаніст.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Святослав Ріхтер (Житомир, 1915-1997) – видатний
                                            радянський піаніст.
                                        </p>
                                    </li>

                                    <li>
                                        <p>
                                            Іван Огієнко (Іларіон) (Брусилів, 1882-1972) –
                                            український вчений, політичний і церковний діяч.
                                        </p>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <h2 className="text-2xl">Транспортне сполучення</h2>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col gap-5">
                                    <p>
                                        <b className="text-m font-bold">
                                            Автотранспортна інфраструктура
                                        </b>{' '}
                                        Житомирської області, розташованої на перетині давніх
                                        торгових шляхів, являє собою доволі щільну мережу
                                        автомобільних доріг. Через автошляхи регіону забезпечується
                                        доступ подорожуючих до туристичних пам’яток і об’єктів краю.
                                        Більшість найвідвідуваніших туристичних об’єктів області
                                        розташовані поблизу магістральних автомобільних доріг. Через
                                        територію Житомирської області проходять три міжнародні
                                        автошляхи.
                                        <br />
                                        <br />
                                        Автошлях М 07 («Варшавка») – довжина 487 км, Київ – Ковель –
                                        контрольно-пропускний пункт «Ягодин» (державний кодон з
                                        Польщею; напрямок на м. Люблін). В межах Житомирської
                                        області траса перетинає Малинський, Коростенський,
                                        Лугинський та Олевський райони. Протяжність у межах області
                                        становить 166,3 км.
                                        <br />
                                        <br />
                                        Автошлях М 06 – довжина 863,8 км, з’єднує Київ та Чоп
                                        (державний кордон з Угорщиною). Проходить через Київську,
                                        Житомирську, Рівненську, Закарпатську області. В межах
                                        Житомирської області перетинає наступні райони:
                                        Брусилівський, Радомишльський, Коростишівський,
                                        Житомирський, Пулинський, Новоград-Волинський. Протяжність
                                        дороги в межах області складає 190,0 км.
                                        <br />
                                        <br />
                                        Автошлях М 21 – довжина 384,2 км. Від контрольно-пропускного
                                        пункту Виступовичі (Білорусь) з’єднує Житомир з
                                        Могилів-Подільським (контрольно-пропускний пункт з
                                        Молдовою). Проходить територією Житомирської та Вінницької
                                        областей. Починаючи на контрольно-пропускному пункті
                                        Виступовичі, проходить через Овруч, Коростень, Черняхів,
                                        Житомир, Бердичів, Калинівку, Вінницю, Жмеринку та
                                        закінчується на пропускному пункті Могилів-Подільський, що
                                        веде до Бельців у Молдові. Загальна протяжність становить
                                        243,9 км.
                                        <br />
                                        <br />
                                        <b className="text-m font-bold">
                                            Залізнична транспортна інфраструктура
                                        </b>{' '}
                                        області включає 67 залізничних станцій, які здійснюють
                                        вантажні та пасажирські перевезення. Управління процесом
                                        перевезень здійснює ПАТ «Укрзалізниця», а саме
                                        Південно-Західна регіональна залізниця. Експлуатаційна
                                        довжина залізниці загального користування по території
                                        області складає 1017 км. Щільність залізничної мережі – 34
                                        км / тис. кв. км. У області є 6 вузлових залізничних
                                        станцій: Коростень, Житомир, Бердичів,
                                        Новоград-Волинський-1, Овруч, Білокоровичі. Від станцій
                                        Житомир та Коростень в п'яти напрямках розходяться
                                        залізничні колії.
                                        <br />
                                        <br />
                                        Територією області проходять двоколійні електрифіковані
                                        залізничні лінії з інтенсивним рухом, а саме, Київ –
                                        Коростень – Новоград-Волинський – Шепетівка – Здолбунів –
                                        Львів. Ділянка Здолбунів – Козятин – Фастів – Київ працює на
                                        межі пропускної спроможності. Працює електрифікована
                                        залізнична лінія на ділянці Коростень – Київ (3 години
                                        триває подорож).
                                        <br />
                                        <br />
                                        Одноколійні залізничні лінії Коростень – Овруч –
                                        Калінковичі, Коростень – Олевськ – Сарни, Коростень –
                                        Новоград-Волинський - Шепетівка, Коростень – Житомир –
                                        Бердичів, Новоград-Волинський - Житомир – Фастів, Житомир –
                                        Коростишів, Білокоровичі – Овруч – Вільча забезпечують,
                                        головним чином, транспортні зв’язки області з прилеглими
                                        областями. Одноколійна залізнична лінія Коростень – Овруч –
                                        Калінковичі є напрямком, що проходять через
                                        українсько-білоруський кордон.
                                        <br />
                                        <br />
                                        Таким чином, залізничне сполучення сприяє формуванню
                                        туристичних потоків з міст Київ (Київська область) та Львів
                                        (Львівська область). Найбільш вигідне залізничне сполучення
                                        мають Коростень як найбільший залізничний вузол, Бердичів,
                                        Коростень та Житомир.
                                        <br />
                                        <br />
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                <h2 className="text-2xl">Представництва іноземних держав</h2>
                            </AccordionTrigger>

                            <AccordionContent>
                                <ul className="flex flex-col gap-5">
                                    <li className="flex gap-5">
                                        <div className="h-[60px] overflow-hidden rounded-xl">
                                            <Icon name="georgia" height={60} width={114} />
                                        </div>
                                        <p>
                                            Генеральне консульство Грузії
                                            <br />
                                            Адреса: вул. Пушкінська, 31
                                            <br />
                                            Телефон: +380 (412) 220 633
                                        </p>
                                    </li>

                                    <li className="flex gap-5">
                                        <div className="h-[60px] overflow-hidden rounded-xl">
                                            <Icon name="lithuania" height={60} width={114} />
                                        </div>
                                        <p>
                                            Почесне Консульство Литви
                                            <br />
                                            Адреса: пл. Перемоги, 10, БЦ
                                            <br />
                                            Телефон: +380 (50) 463-72-26, +380 (542) 48-71-01
                                        </p>
                                    </li>

                                    <li className="flex gap-5">
                                        <div className="h-[60px] overflow-hidden rounded-xl">
                                            <Icon name="poland" height={60} width={114} />
                                        </div>
                                        <p>
                                            Польский дім
                                            <br />
                                            Адреса: вул. Чуднівська, 34б
                                            <br />
                                            Телефон: +380 (412) 24-34-22
                                        </p>
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </section>
        </>
    );
};

export default AboutPage;
