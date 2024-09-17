import type { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import type { InputProps } from '@ui/input';
import { Input } from '@ui/input';

type Props<T> = { label?: string; type?: string; name: string; control: Control<T> };

const FormInputField = <T,>({
    type = 'text',
    label,
    placeholder,
    disabled,
    name,
    control,
}: InputProps & Props<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInputField;
