import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import type { InputProps } from '@ui/input';
import { Input } from '@ui/input';
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
                    {label && (
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
