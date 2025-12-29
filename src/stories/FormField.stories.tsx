import { CardContent, CardWithShadow, Input } from "@/components/ui";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";

export default {
  title: "component/ui/Field",
};

/**
shadcn ベースのフィールドコンポーネント<br>
モーダルの時は`<daialog>`で囲って使用します。
**/

export const Basic = () => {
  const form = useForm();
  return (
    <div className="w-lg">
      {/* Storybook専用の表示幅 */}
      <CardWithShadow>
        <CardContent>
          <form className="space-y-4 px-6 w-full">
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="gap-0">
                      メールアドレス
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="example@mail.com"
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
      </CardWithShadow>
    </div>
  );
};
