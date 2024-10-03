'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { INPUT_STYLES, THEME_BORDER } from '@lib/constants';
import { format } from 'date-fns';

import { Button } from '@ui/button';
import { Calendar } from '@ui/calendar';
import { Checkbox } from '@ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import type { InputProps } from '@ui/input';
import { Input } from '@ui/input';
import MultipleSelector from '@ui/multiple-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Textarea } from '@ui/textarea';

export type SelectItemType = {
    label: string;
    value: string;
};

type Props<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    selectItems?: SelectItemType[];
};

const FormInputField = <T extends FieldValues>({
    type = 'text',
    label,
    placeholder,
    disabled,
    name,
    control,
    selectItems,
    error,
    required,
}: Omit<InputProps, 'name' | 'control'> & Props<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && type !== 'check' && (
                        <>
                            <FormLabel>{label}</FormLabel>
                            {required && <span className="ml-1 font-bold">*</span>}
                        </>
                    )}

                    {type === 'select' && selectItems && selectItems.length > 0 ? (
                        <Select disabled={disabled} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                {selectItems.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : type === 'date' ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        disabled={disabled}
                                        className={`w-full ${INPUT_STYLES}`}
                                        variant={'light'}
                                    >
                                        {field.value ? (
                                            format(field.value, 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>

                            <PopoverContent
                                className={`w-auto rounded-3xl bg-themeBg p-0 text-themeFg ${THEME_BORDER} shadow-main`}
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={date => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    ) : type === 'check' ? (
                        <div className="flex h-full items-center gap-5">
                            <FormControl>
                                <Checkbox
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>

                            <FormLabel>{label}</FormLabel>
                        </div>
                    ) : type === 'multi' ? (
                        <FormControl>
                            <MultipleSelector
                                {...field}
                                disabled={disabled}
                                defaultOptions={selectItems}
                                placeholder={placeholder}
                                maxSelected={5}
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        no results found.
                                    </p>
                                }
                            />
                        </FormControl>
                    ) : (
                        <FormControl>
                            {type === 'textarea' ? (
                                <Textarea
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    className="h-36 resize-none"
                                    {...field}
                                />
                            ) : (
                                <Input
                                    {...field}
                                    type={type}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    error={error}
                                />
                            )}
                        </FormControl>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInputField;
