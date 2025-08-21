import { type CheckedState } from '@radix-ui/react-checkbox';
import { StandardSchemaV1Issue, createFormHook, createFormHookContexts } from '@tanstack/react-form';
import * as React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        Label: ({ ...props }: React.ComponentProps<typeof Label>) => {
            const { name } = useFieldContext();

            return <Label htmlFor={name} {...props} />;
        },
        Input: ({ ...props }: React.ComponentProps<typeof Input>) => {
            const { name, state, handleChange, handleBlur } = useFieldContext<string>();

            return (
                <Input
                    id={name}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={event => handleChange(event.target.value)}
                    {...props}
                />
            );
        },
        Checkbox: ({ ...props }: React.ComponentProps<typeof Checkbox>) => {
            const { name, state, handleChange, handleBlur } = useFieldContext<CheckedState>();

            return (
                <Checkbox
                    id={name}
                    name={name}
                    checked={state.value}
                    onBlur={handleBlur}
                    onCheckedChange={value => handleChange(value)}
                    {...props}
                />
            );
        },
        Error: ({ className, ...props }: React.ComponentProps<'p'>) => {
            const { state } = useFieldContext();

            if (state.meta.isValid) return null;

            const error: StandardSchemaV1Issue | string = state.meta.errors[0];

            return (
                <p className={cn('text-sm text-destructive', className)} {...props}>
                    {typeof error === 'object' ? error.message : error}
                </p>
            );
        }
    },
    formComponents: {}
});
